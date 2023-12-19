import { Button } from '@mui/material'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../components/UserProvider'
import axios from 'axios'
import requestbg from '../assets/images/requestbg.jpg'
import joinbg from '../assets/images/joinbg.jpg'

export default function Home() {
  const { user } = useContext(UserContext)
  console.log(user.id)
  const handleRequestNow = () => {
    axios
      .post('http://localhost:8080/request', { userID: user.id })
      .then(response => {
        if (response.data.success) {
          alert(response.data.message)
        } else {
          alert('You have already requested.')
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error)
      })
  }

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 65px)' }}>
      {/* request */}
      <div
        style={{
          flex: '1',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              border: '0px solid black',
              padding: '10px',
              height: '300px',
              width: '500px',
              borderRadius: '30px',
              background: 'linear-gradient(to left, #E2E2E2, #C9D6FF)',
              backgroundImage: `url(${requestbg})`,
              backgroundSize: 'cover',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '8px 8px 25px rgba(0, 0, 0, 0.5)',
            }}
          >
            <h1
              style={{
                color: 'white',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                borderRadius: '15px',
                padding: '10px',
              }}
            >
              Organize an event! <br></br> Be an Organizer.
            </h1>
            <Button
              onClick={handleRequestNow}
              variant='contained'
              style={{ color: '#F2AE2E', backgroundColor: 'white', borderRadius: '10px' }}
            >
              Request now
            </Button>
          </div>
        </div>
      </div>

      {/* join event */}
      <div
        style={{
          flex: '1',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: -95,
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div
            alt='background'
            style={{
              border: '0px solid black',
              padding: '10px',
              height: '300px',
              width: '500px',
              borderRadius: '30px',
              background: 'linear-gradient(to right, #E2E2E2, #C9D6FF)',
              backgroundImage: `url(${joinbg})`,
              backgroundSize: 'cover',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '8px 8px 25px rgba(0, 0, 0, 0.5)',
            }}
          >
            <h1
              style={{
                color: 'white',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                borderRadius: '15px',
                padding: '10px',
              }}
            >
              Join an event! <br></br> Be an a participant.
            </h1>
            <Button
              component={Link}
              to='/events'
              variant='contained'
              style={{ color: '#F2AE2E', backgroundColor: 'white', borderRadius: '10px' }}
            >
              Join now
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
