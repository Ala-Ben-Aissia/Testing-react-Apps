// mocking Browser APIs and modules
// http://localhost:3000/location

import {act, render, screen} from '@testing-library/react'
import * as React from 'react'
import Location from '../../examples/location'

beforeAll(() => {
  window.navigator.geolocation = {
    getCurrentPosition: jest.fn(),
  }
})

function deferred() {
  let resolve, reject
  const promise = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })
  return {promise, resolve, reject}
}

test('displays the users current location', async () => {
  const fakePosition = {
    coords: {latitude: 36, longitude: 10},
  }
  const {promise, resolve} = deferred()

  window.navigator.geolocation.getCurrentPosition.mockImplementation(
    (successCallback, errorCallback) => {
      promise
        .then(() => successCallback(fakePosition))
        .catch(() => errorCallback())
    },
  )

  render(<Location />)
  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()

  await act(async () => {
    resolve() // calling the success callback (which will call the state updater function to trigger an update to the state), but React wasn't expecting that but we were!, and in top of that we want to make sure that all the side effects tiggered as a result of that state update are flushed before we continue on with our test, because it might be a slight delay between the state update (the running side effects) and the DOM (UI) update that is unperceptibe to the user but not here while testing
    await promise // once this promise resolves => flush all the side effects that occur during that time
  })
  // we wrapped this callback in an act function (we usually don't since react-Testing Library handle this process)

  expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
  expect(screen.getByText(/latitude/i)).toHaveTextContent(
    `Latitude: ${fakePosition.coords.latitude}`,
  )
  expect(screen.getByText(/longitude/i)).toHaveTextContent(
    `Longitude: ${fakePosition.coords.longitude}`,
  )
})

/*
eslint
  no-unused-vars: "off",
*/
