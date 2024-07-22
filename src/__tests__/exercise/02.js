// simple test with React Testing Library
// http://localhost:3000/counter

import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Counter from '../../components/counter'

global.IS_REACT_ACT_ENVIRONMENT = true

test('counter increments and decrements when the buttons are clicked', async () => {
  render(<Counter />)

  const increment = screen.getByRole('button', {name: /increment/i})
  const decrement = screen.getByRole('button', {name: /decrement/i})
  const message = screen.getByText(/current count/i)

  expect(message).toHaveTextContent('Current count: 0')

  await userEvent.click(increment)
  expect(message).toHaveTextContent('Current count: 1')
  await userEvent.click(decrement)
  expect(message).toHaveTextContent('Current count: 0')

  //* T  he only difference between userEvent and fireEvent is that userEvent will trigger multiple related events to mimic real user behavior
  //? When using userEvent.click(), it might trigger a series of events like mouseOver, mouseMove, mouseDown, focus, mouseUp, and click, which more closely resembles a real user interaction. In contrast, fireEvent.click() would only trigger the click event.
})
