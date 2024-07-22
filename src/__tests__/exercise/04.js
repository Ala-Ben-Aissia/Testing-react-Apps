// form testing
// http://localhost:3000/login

const {screen, render} = require('@testing-library/react')
const {default: userEvent} = require('@testing-library/user-event')
const {default: Login} = require('components/login')
import faker from 'faker'

test('submitting the form calls onSubmit with username and password', async () => {
  function buildLoginForm({password}) {
    return {
      username: faker.internet.userName(),
      password: password ?? faker.internet.password(),
    }
  }
  const onSubmit = jest.fn()
  render(<Login onSubmit={onSubmit} />)

  const {username, password} = buildLoginForm({password: 'abc'})
  const usernameEl = screen.getByRole('textbox', {name: /username/i})
  const passwordEl = screen.getByLabelText(/password/i)

  await userEvent.type(usernameEl, username)
  await userEvent.type(passwordEl, password)
  await userEvent.click(screen.getByRole('button', {name: /submit/i}))

  expect(onSubmit).toHaveBeenCalledWith({username, password: 'abc'})
})

/*
eslint
  no-unused-vars: "off",
*/
