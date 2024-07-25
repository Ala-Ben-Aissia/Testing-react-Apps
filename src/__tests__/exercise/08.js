// testing custom hooks
// http://localhost:3000/counter-hook

import {act, render} from '@testing-library/react'
import * as React from 'react'
import useCounter from '../../components/use-counter'

function setup({defaults} = {}) {
  const result = {}
  //? this result is not the same as X
  function TestComponent() {
    result.current = useCounter(defaults)
    return null
  }
  render(<TestComponent />)

  return result
}

test('exposes the count and increment/decrement functions', async () => {
  const result = setup() //? X

  expect(result.current.count).toBe(0)

  act(() => result.current.increment())
  expect(result.current.count).toBe(1)

  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)
})

test('allows customization of the initial count', async () => {
  const result = setup({defaults: {initialCount: 3}}) //? X

  expect(result.current.count).toBe(3)

  act(() => result.current.increment())
  expect(result.current.count).toBe(4)

  act(() => result.current.decrement())
  expect(result.current.count).toBe(3)
})

test('allows customization of the step', async () => {
  const result = setup({defaults: {step: 2}}) //? X)

  expect(result.current.count).toBe(0)

  act(() => result.current.increment())
  expect(result.current.count).toBe(2)

  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)
})
