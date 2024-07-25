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

// ... (previous code remains the same)

test('displays the users current location', async () => {
  // Mock the geolocation position
  const fakePosition = {
    coords: {latitude: 36, longitude: 10},
  }
  // Create a deferred promise to control the timing of the geolocation callback
  const {promise, resolve} = deferred()

  // Mock the getCurrentPosition method
  window.navigator.geolocation.getCurrentPosition.mockImplementation(
    (successCallback, errorCallback) => {
      // Use the deferred promise to control when the callback is invoked
      promise
        .then(() => successCallback(fakePosition))
        .catch(() => errorCallback())
    },
  )

  // Render the Location component
  render(<Location />)
  // Check if the loading indicator is initially displayed
  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()

  await act(async () => {
    // Resolve the promise to trigger the success callback
    resolve()
    // Wait for the promise to resolve and all side effects to complete
    await promise
    // The act function ensures that all updates related to these events have been processed and applied before proceeding with the test
  })
  // We use act here to encompass any state updates and side effects that occur as a result of resolving the geolocation promise

  // Verify that the loading indicator is no longer present
  expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
  // Check if the latitude is correctly displayed
  expect(screen.getByText(/latitude/i)).toHaveTextContent(
    `Latitude: ${fakePosition.coords.latitude}`,
  )
  // Check if the longitude is correctly displayed
  expect(screen.getByText(/longitude/i)).toHaveTextContent(
    `Longitude: ${fakePosition.coords.longitude}`,
  )
})

/*
eslint
  no-unused-vars: "off",
*/
