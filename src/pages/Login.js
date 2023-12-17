import { Button, Typography } from '@mui/material'
import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import bg from '../assets/images/bg.jpg'
import validation from './LoginValidation'
import { UserContext } from '../components/UserProvider'
import axios from 'axios'
export default function Login() {
  const [values, setValues] = useState({
    email: '',
    password: '',
  })
  const navigate = useNavigate()
  const [errors, setErrors] = useState({})
  const { setUser } = useContext(UserContext)

  const handleInput = e => {
    setValues(prev => ({ ...prev, [e.target.name]: [e.target.value] }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    const err = validation(values)
    setErrors(err)

    const email = values.email[0]
    const password = values.password[0]

    if (err.email === '' && err.password === '') {
      axios
        .post('http://localhost:8080/login', { email, password })
        .then(res => {
          if (res.data.success) {
            setUser(res.data.data)
            navigate('/home')
          } else {
            setErrors(prevErrors => ({
              ...prevErrors,
              submit: 'Invalid username or password. Please try again.',
            }))
          }
        })
        .catch(err => console.log(err))
    }
  }

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ flex: '1', position: 'relative', overflow: 'hidden' }}>
        <img
          src={bg}
          alt='background'
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            position: 'absolute',
            top: '0',
            left: '0',
          }}
        />
      </div>
      <div style={{ flex: '1' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            margin: '0',
          }}
        >
          <Typography variant='h4' noWrap component='div'>
            <span style={{ fontWeight: 'bold', letterSpacing: '-3px', color: '#706D6D' }}>
              METRO
            </span>{' '}
            <span
              style={{
                fontWeight: 200,
                fontFamily: 'Nunito Sans, sans-serif',
                letterSpacing: '5px',
                color: '#F2AE2E',
              }}
            >
              GALA
            </span>
          </Typography>
          <h1 style={{ fontSize: '4.5rem', margin: '0' }}>LOGIN</h1>
          <br />

          <form action='' onSubmit={handleSubmit}>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <Typography style={{ marginRight: '10px', fontSize: '15px' }}>Email</Typography>
              {errors.email && (
                <span style={{ fontSize: '12px', color: 'red' }}>{errors.email}</span>
              )}
            </div>
            <input
              onChange={handleInput}
              name='email'
              style={{
                width: '350px',
                height: '30px',
                borderRadius: '10px',
                border: 'solid 2px #F2EC9B',
                padding: '5px',
              }}
              type='text'
            />

            <br />
            <br />
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <Typography style={{ fontSize: '15px' }}>Password</Typography>
              {errors.password && (
                <span style={{ fontSize: '12px', color: 'red' }}>{errors.password}</span>
              )}
            </div>
            <input
              name='password'
              onChange={handleInput}
              style={{
                width: '350px',
                height: '30px',
                borderRadius: '10px',
                border: 'solid 2px #F2EC9B',
                padding: '5px',
              }}
              type='password'
            />

            <div>
              <span>
                <Link
                  to={'/register'}
                  style={{
                    fontSize: '15px',
                    marginRight: '150px',
                    textDecoration: 'none',
                    color: '#F2AE2E',
                  }}
                >
                  Create memories. Register!
                </Link>
              </span>
            </div>
            <br />
            <br />
            <div style={{ textAlign: 'center' }}>
              <Button
                type='submit'
                variant='contained'
                style={{
                  width: '150px',
                  backgroundColor: '#F2AE2E',
                  borderRadius: '10px',
                }}
              >
                Proceed
              </Button>
              <br />
              <br />
              {errors.submit && (
                <span style={{ fontSize: '12px', color: 'red' }}>{errors.submit}</span>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
