// testing custom hooks
// http://localhost:3000/counter-hook

import {act, render} from '@testing-library/react'
import * as React from 'react'
import useCounter from '../../components/use-counter'

const result = {}

test('exposes the count and increment/decrement functions', async () => {
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
