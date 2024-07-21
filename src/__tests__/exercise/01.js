// simple test with ReactDOM
// http://localhost:3000/counter

import * as React from 'react'
import {createRoot} from 'react-dom/client'
import {act} from 'react-dom/test-utils'
import Counter from '../../components/counter'

// NOTE: this is a new requirement in React 18
// https://react.dev/blog/2022/03/08/react-18-upgrade-guide#configuring-your-testing-environment
// Luckily, it's handled for you by React Testing Library :)
global.IS_REACT_ACT_ENVIRONMENT = true

test('counter increments and decrements when the buttons are clicked', () => {
  const div = document.createElement('div')
  document.body.append(div)
  const root = createRoot(div)
  act(() => root.render(<Counter />))

  const message = div.firstChild.querySelector('div')
  const [decrement, increment] = div.querySelectorAll('button')

  expect(message.textContent).toBe('Current count: 0')

  const clickEvent = new MouseEvent('click', {
    bubbles: true, // event delegation
    cancelable: true,
    button: 0, // left button click
  })

  act(() => increment.dispatchEvent(clickEvent))
  expect(message.textContent).toBe('Current count: 1')

  act(() => decrement.dispatchEvent(clickEvent))
  expect(message.textContent).toBe('Current count: 0')

  div.remove()
  // 🦉 If you don't cleanup, then it could impact other tests and/or cause a memory leak
})

/* eslint no-unused-vars:0 */
