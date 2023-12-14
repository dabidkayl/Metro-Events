import React, { useContext, useState } from 'react'
import { EventContext } from '../components/EventProvider'
import bg from '../assets/images/bg.jpg'
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material'

export default function EventDetails() {
  const { selectedEvent } = useContext(EventContext)
  const [openDialog, setOpenDialog] = useState(false)

  const handleJoinClick = () => {
    setOpenDialog(true)
  }

  const handleClose = () => {
    setOpenDialog(false)
  }

  const date = new Date(selectedEvent.eventDate)
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  const formattedDate = date.toLocaleDateString(undefined, options)

  if (!selectedEvent) {
    return <div>Loading...</div>
  }

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 65px)' }}>
      <div style={{ flex: 'none', width: '250px', position: 'relative', height: '100%' }}>
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
      <div
        style={{
          flex: '1',
          width: 'calc(100% - 250px)',
          overflow: 'hidden',
          height: '100%',
          padding: '50px',
        }}
      >
        <div style={{ border: '1px solid black', padding: '20px' }}>
          <h2>{selectedEvent.eventName}</h2>
          <h5>{selectedEvent.eventLocation}</h5>
          <h5>{formattedDate}</h5>
          <h3>{selectedEvent.eventStatus}</h3>

          <p>{selectedEvent.eventDescription}</p>

          <Button variant='contained' size='medium' onClick={handleJoinClick}>
            Join Now
          </Button>
          <Dialog open={openDialog} onClose={handleClose}>
            <DialogTitle>
              <h2>{selectedEvent.eventName}</h2>
              <h6>{selectedEvent.eventLocation}</h6>
              <h6>{formattedDate}</h6>
            </DialogTitle>
            <DialogContent>
              <form style={{ margin: '10px' }}>
                <TextField
                  label='First Name'
                  variant='outlined'
                  fullWidth
                  sx={{ marginBottom: '10px' }}
                />
                <TextField
                  label='Last Name'
                  variant='outlined'
                  fullWidth
                  sx={{ marginBottom: '10px' }}
                />
                <TextField label='Age' variant='outlined' fullWidth sx={{ marginBottom: '10px' }} />
              </form>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button variant='contained' onClick={handleClose}>
                Join
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  )
}
