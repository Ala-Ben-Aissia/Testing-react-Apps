// testing custom hooks
// http://localhost:3000/counter-hook

import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as React from 'react'
import useCounter from '../../components/use-counter'

const TestComponent = () => {
  const {count, decrement, increment} = useCounter()
  return (
    <div>
      <p role="myTestCount">{count}</p>
      <button onClick={decrement}>decrement</button>
      <button onClick={increment}>increment</button>
    </div>
  )
}

test('exposes the count and increment/decrement functions', async () => {
  // 🐨 render the component
  render(<TestComponent />)
  const incBtn = screen.getByRole('button', {name: /increment/i})
  const decBtn = screen.getByRole('button', {name: /decrement/i})
  const count = screen.getByRole('myTestCount')

  expect(count).toHaveTextContent('0')

  await userEvent.click(incBtn)
  expect(count).toHaveTextContent('1')

  await userEvent.click(decBtn)
  expect(count).toHaveTextContent('0')
})
