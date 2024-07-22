// form testing
// http://localhost:3000/login

const {screen, render} = require('@testing-library/react')
const {default: userEvent} = require('@testing-library/user-event')
const {default: Login} = require('components/login')

test('submitting the form calls onSubmit with username and password', async () => {
  let submittedData
  const handleSubmit = data => (submittedData = data)

  render(<Login onSubmit={handleSubmit} />)
  const username = screen.getByRole('textbox', {name: /username/i})
  const password = screen.getByLabelText(/password/i)

  await userEvent.type(username, 'Ala')
  await userEvent.type(password, '0000')
  await userEvent.click(screen.getByRole('button', {name: /submit/i}))

  expect(submittedData).toEqual({username: 'Ala', password: '0000'})
})

/*
eslint
  no-unused-vars: "off",
*/
