import { Button } from '@mui/material'
import React from 'react'

export default function Home() {
  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 65px)' }}>
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
          <h1>Organize an event! Be an Organizer.</h1>
          <Button variant='contained' style={{ backgroundColor: '#F2AE2E', borderRadius: '10px' }}>
            Request now
          </Button>
        </div>
      </div>
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
          <h1>Join an Event</h1>
          <Button variant='contained' style={{ backgroundColor: '#F2AE2E', borderRadius: '10px' }}>
            Join now
          </Button>
        </div>
      </div>
    </div>
  )
}
