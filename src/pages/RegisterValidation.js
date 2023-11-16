function validation(values) {
  let error = {}
  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  // const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-z0-9]{8,}$/
  const password_pattern = /^.{8,}$/

  if (values.email === '') {
    error.email = 'Please provide an email.'
  } else if (!email_pattern.test(values.email)) {
    error.email = 'Invalid email format '
  } else {
    error.email = ''
  }

  if (values.password === '') {
    error.password = 'Please provide a password.'
  } else if (!password_pattern.test(values.password)) {
    error.password = 'Password should be at least 8 characters.'
  } else {
    error.password = ''
  }

  return error
}

export default validation
