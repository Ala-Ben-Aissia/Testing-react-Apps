// form testing
// http://localhost:3000/login

const {build, fake} = require('@jackfranklin/test-data-bot')
const {screen, render} = require('@testing-library/react')
const {default: userEvent} = require('@testing-library/user-event')
const {default: Login} = require('components/login')

const buildLoginForm = build({
  fields: {
    username: fake(f => f.internet.userName()),
    password: fake(f => f.internet.password()),
  },
})

test('submitting the form calls onSubmit with username and password', async () => {
  const onSubmit = jest.fn()
  render(<Login onSubmit={onSubmit} />)

  const {username, password} = buildLoginForm({overrides: {password: 'abc'}})

  const usernameInput = screen.getByRole('textbox', {name: /username/i})
  const passwordInput = screen.getByLabelText(/password/i)

  await userEvent.type(usernameInput, username)
  await userEvent.type(passwordInput, password)
  await userEvent.click(screen.getByRole('button', {name: /submit/i}))

  //* expect(onSubmit).toHaveBeenCalledWith({username, password: 'abc'})
  expect(onSubmit).toHaveBeenCalledWith({username, password})
  expect(onSubmit).toHaveBeenCalledTimes(1)
})

/*
eslint
  no-unused-vars: "off",
*/
