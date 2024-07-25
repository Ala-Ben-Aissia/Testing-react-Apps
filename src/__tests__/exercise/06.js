// mocking Browser APIs and modules
// http://localhost:3000/location

import {act, render, screen} from '@testing-library/react'
import * as React from 'react'
import {useCurrentPosition} from 'react-use-geolocation'
import Location from '../../examples/location'

jest.mock('react-use-geolocation') // mock all exports of this module including useCurrentPosition custom hook.

test('displays the users current location', async () => {
  const fakePosition = {
    coords: {latitude: 36, longitude: 10},
  }

  let setReturnValue

  const useMockCurrentPosition = () => {
    const [position, setPosition] = React.useState([])
    setReturnValue = setPosition
    return position
  }

  useCurrentPosition.mockImplementation(useMockCurrentPosition)

  // Render the Location component
  render(<Location />)
  // Check if the loading indicator is initially displayed
  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()

  act(() => {
    setReturnValue([fakePosition])
  })

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
