// mocking HTTP requests
// http://localhost:3000/login-submission

import {build, fake} from '@jackfranklin/test-data-bot'
import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {rest} from 'msw'
import {setupServer} from 'msw/lib/node'
import * as React from 'react'
import {handlers} from 'test/server-handlers'
import Login from '../../components/login-submission'

const buildLoginForm = build({
  fields: {
    username: fake(f => f.internet.userName()),
    password: fake(f => f.internet.password()),
  },
})

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test(`logging in displays the user's username`, async () => {
  render(<Login />)
  const {username, password} = buildLoginForm()

  await userEvent.type(screen.getByLabelText(/username/i), username)
  await userEvent.type(screen.getByLabelText(/password/i), password)

  await userEvent.click(screen.getByRole('button', {name: /submit/i}))

  await waitForElementToBeRemoved(() => screen.queryByLabelText(/loading/i))

  expect(screen.getByText(username)).toBeInTheDocument()
})

test('omitting the password result in an error', async () => {
  render(<Login />)
  const {username} = buildLoginForm()
  await userEvent.type(
    screen.getByRole('textbox', {name: /username/i}),
    username,
  )
  await userEvent.click(screen.getByRole('button', {name: /submit/i}))

  await waitForElementToBeRemoved(() => screen.queryByLabelText(/loading/i))

  // expect(screen.getByRole('alert')).toHaveTextContent("password required")
  expect(screen.getByRole('alert').textContent).toMatchInlineSnapshot(
    `"password required"`,
  ) // snpashot will be updated automatically (press `u`)
})

test('unknown server error displays the error message', async () => {
  const testErrorMessage = 'Oh no, something went wrong!'
  server.use(
    rest.post(
      'https://auth-provider.example.com/api/login',
      async (req, res, ctx) =>
        res(ctx.status(500), ctx.json({message: testErrorMessage})),
    ),
  )
  render(<Login />)
  await userEvent.click(screen.getByRole('button', {name: /submit/i}))

  await waitForElementToBeRemoved(() => screen.queryByLabelText(/loading/i))

  // expect(screen.getByRole('alert').textContent).toMatchInlineSnapshot(
  //   `"Oh no, something went wrong!"`,
  // )

  expect(screen.getByRole('alert')).toHaveTextContent(testErrorMessage)
})
