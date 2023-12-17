import React, { useContext, useState } from 'react'
import { EventContext } from '../components/EventProvider'
import bg from '../assets/images/bg.jpg'
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
} from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function EventDetails() {
  const { selectedEvent } = useContext(EventContext)
  const [openDialog, setOpenDialog] = useState(false)

  const handleJoinClick = () => {
    setOpenDialog(true)
  }

  const handleClose = () => {
    setOpenDialog(false)
  }

  const date = new Date(selectedEvent.eventDate);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = date.toLocaleDateString(undefined, options);
  
  const dateOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  };
  const formattedDate2 = date.toLocaleDateString(undefined, dateOptions);

  const timeOptions = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
  };
  const formattedTime = date.toLocaleTimeString(undefined, timeOptions);
  
  if (!selectedEvent) {
    return <div>Loading...</div>
  }

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 65px)'}}>
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
        <div style={{ border: '1px solid #F2AE2E', padding: '20px' }}>
          {/* event name */}
          <h1 style={{ marginBottom: -15, color: '#FFD356'}}>
            {selectedEvent.eventName}&nbsp; 
            {selectedEvent.eventStatus === 'Active' ? (
              <CheckCircleIcon style={{ fontSize: 24, color: 'green', marginRight: 4 }} />
            ) : null}
          </h1>

          
          {/* event details */}
          <h4 style={{marginBottom: -15, color: '#F2AE2E'}}>
            Event Details:
          </h4>

          {/*event location*/}
          <p style={{fontSize: 16, marginBottom: -14}}>
            <LocationOnIcon style={{ fontSize: 14, marginRight: 1}} /> 
            {selectedEvent.eventLocation}
          </p>

          {/* event date */}
          <p style={{fontSize: 16, marginBottom: -14}}>
            <EventIcon style={{ fontSize: 14, marginRight: 4}} />
            {formattedDate}
          </p>

          {/* event time */}
          <p style={{fontSize: 16, marginBottom: -14 }}>
            <AccessTimeIcon style={{ fontSize: 14, marginRight: 4}}/>
            {formattedTime}&nbsp;
          </p>

          {/* event status */}
          <p>
            Status: 
            <strong> {selectedEvent.eventStatus === 'Active' ? (
            <span style={{ color: 'green' }}>
              {selectedEvent.eventStatus}
            </span>
            ) : selectedEvent.eventStatus === 'Cancelled' ? (
              <span style={{ color: 'red' }}>
                {selectedEvent.eventStatus}
              </span>
            ) : (
              <span>
                {selectedEvent.eventStatus}
              </span>
            )}</strong>
          </p>

          {/* event description */}
          <h4 style={{marginBottom: -15, color: '#F2AE2E'}}>
            Event Description:
          </h4>
          <p style={{ textAlign: 'justify'}}>
            <em>{selectedEvent.eventDescription}</em>
          </p>

          {/* join button  */}
          <Button variant='contained' size='medium' onClick={handleJoinClick} style={{ backgroundColor: '#F2AE2E', color: 'white' }}>
            Join Now
          </Button>

          <Dialog open={openDialog} onClose={handleClose}>
            <DialogTitle style={{marginBottom: 10}}>
              {/* dialog registration */}
              <h2 style={{ marginBottom: -20, color: '#F2AE2E'}}>
                Event Registration
              </h2>

              {/* dialog event name */}
              <p style={{fontSize: 17, marginBottom: -20}}>
                <strong>Event Name: </strong>
                <span style={{fontSize: 15}}>{selectedEvent.eventName}</span>
              </p>

              {/* dialog event location */}
              <p style={{fontSize: 17, marginBottom: -20}}>
                <strong>Location: </strong>
                <span style={{fontSize: 15}}>{selectedEvent.eventLocation}</span>
              </p>

              {/* dialog event date */}
              <p style={{fontSize: 17, marginBottom: -15}}>
                <strong>Date: </strong><span style={{fontSize: 15}}>{formattedDate2}</span> &nbsp; 
                <strong>Time:</strong> <span style={{fontSize: 15}}>{formattedTime}</span>
              </p>
            </DialogTitle>

            <DialogContent>
              <form style={{ margin: '10px', marginLeft: 0 }}>
                {/* Name */}
                <TextField
                  label="First"
                  variant="outlined"
                  fullWidth
                  sx={{ maxWidth: '267px', marginBottom: '10px' }}
                />
                
                <TextField
                  label="Last"
                  variant="outlined"
                  fullWidth
                  sx={{ maxWidth: '267px', marginBottom: '10px', marginLeft: 1 }}
                />

                {/* gender */}
                <FormControl sx={{ width: '100px', marginBottom: '10px' }}>
                  <InputLabel id="gender-label">Gender</InputLabel>
                  <Select
                    labelId="gender-label"
                    label="Gender"
                    variant="outlined"
                    fullWidth
                    sx={{ width: '100%' }} // Adjust the width as needed
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>

                {/* age */}
                <TextField label='Age' variant='outlined' fullWidth sx={{ maxWidth: '160px', marginBottom: '10px', marginLeft: 1 }} />

                {/* address */}
                <TextField label='Address' variant='outlined' fullWidth sx={{ maxWidth: '265px', marginBottom: '10px', marginLeft: 1 }} />
                
                {/* email */}
                <TextField label='Email' variant='outlined' fullWidth sx={{ maxWidth: '400', marginBottom: '10px' }} />
              </form>
            </DialogContent>
              
            <DialogActions>
              <Button onClick={handleClose} style={{color: '#F2AE2E'}}>Cancel</Button>
              <Button variant='contained' onClick={handleClose} style={{ backgroundColor: '#F2AE2E', color: 'white' }}>
                Join
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  )
}
