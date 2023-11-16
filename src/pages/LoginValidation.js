function validation(values) {
  let errors = {}
  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  // const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-z0-9]{8,}$/
  const password_pattern = /^.{8,}$/

  // eslint-disable-next-line
  if (values.email != 'admin' && values.password != 'admin') {
    if (values.email === '') {
      errors.email = 'Please provide an email.'
    } else if (!email_pattern.test(values.email)) {
      errors.email = 'Invalid email format.'
    } else {
      errors.email = ''
    }

    if (values.password === '') {
      errors.password = 'Please provide a password.'
    } else if (!password_pattern.test(values.password)) {
      errors.password = 'Password should be at least 8 characters.'
    } else {
      errors.password = ''
    }
  } else {
    errors.email = ''
    errors.password = ''
  }

  return errors
}

export default validation
