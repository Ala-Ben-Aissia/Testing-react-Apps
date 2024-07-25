// testing custom hooks
// http://localhost:3000/counter-hook

import {act, render} from '@testing-library/react'
import * as React from 'react'
import useCounter from '../../components/use-counter'

test('exposes the count and increment/decrement functions', async () => {
  const result = {}
  function TestComponent() {
    Object.assign(result, useCounter())
    return null
  }
  render(<TestComponent />)

  expect(result.count).toBe(0)

  act(() => result.increment())
  expect(result.count).toBe(1)

  act(() => result.decrement())
  expect(result.count).toBe(0)
})

test('allows customization of the initial count', async () => {
  const result = {}
  function TestComponent() {
    Object.assign(result, useCounter({initialCount: 3}))
    return null
  }
  render(<TestComponent />)

  expect(result.count).toBe(3)

  act(() => result.increment())
  expect(result.count).toBe(4)

  act(() => result.decrement())
  expect(result.count).toBe(3)
})

test('allows customization of the step', async () => {
  const result = {}
  function TestComponent() {
    Object.assign(result, useCounter({step: 2}))
    return null
  }
  render(<TestComponent />)

  expect(result.count).toBe(0)

  act(() => result.increment())
  expect(result.count).toBe(2)

  act(() => result.decrement())
  expect(result.count).toBe(0)
})
