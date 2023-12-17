import React, { useState } from 'react'
import { TextField, Typography, Button, Input } from '@mui/material'
import bg from '../assets/images/bg.jpg'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import axios from 'axios'

export default function CreateEvent() {
  const [values, setValues] = useState({
    event: '',
    organizer: '',
    description: '',
    location: '',
    type: '',
    date: '',
    image: '',
  })

  const handleInput = e => {
    setValues(prev => ({ ...prev, [e.target.name]: [e.target.value] }))
    console.log(values)
  }

  const handleDateChange = date => {
    setValues(prev => ({ ...prev, date: date }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    axios
      .post('http://localhost:8080/create-events', values)
      .then(res => {
        alert('Successfully set up an event')
      })
      .catch(err => console.log(err))
  }

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 65px)'}}>
      {/* bg */}
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
      
      {/* form */}
      <div

        style={{
          flex: '1',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 1,
          marginLeft: 35,
          marginRight: 'auto'
        }}

      >
        <form action='' onSubmit={handleSubmit}>
          <div
            style={{
              padding: '20px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              display: 'flex',
              flexDirection: 'column',
              gap: '15px',
              boxShadow: '0px 0px 30px rgba(0, 0, 0, 0.1)',
            }}
          >
            {/* create event */}
            <div style={{ textAlign: 'center' , marginTop: -20 }}>
              <h2 style={{color: '#F2AE2E', marginBottom: -10}}>CREATE EVENT</h2>
            </div>

            {/* event name */}
            <div style={{ display: 'flex', gap: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <TextField 
                  onChange={handleInput} 
                  name='event' 
                  label='Event Name'
                  variant='outlined' 
                  />
              </div>

            {/* organizer */}
            <div style={{ display: 'inline-block', flexDirection: 'column' }}>
                <TextField 
                  onChange={handleInput} 
                  name='organizer' 
                  label='Organizer'
                  variant='outlined' 
                  disabled 
                  />
              </div>
            </div>

            {/* description */}
            <div>
              <TextField 
                onChange={handleInput}
                name='description'
                label='Description'
                variant='outlined'
                multiline
                rows={3}
                style={{ width: '600px' }}
              />
            </div>

            {/* location */}
            <div>
              <TextField
                onChange={handleInput}
                name='location'
                label='Location'
                variant='outlined'
                style={{ width: '600px' }}
              />
            </div>

            {/* event type */}
            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <TextField
                  onChange={handleInput}
                  name='type'
                  label='Event Type'
                  variant='outlined'
                  style={{ width: '320px', marginTop: '8px' }}
                />
              </div>

            {/* date */}
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker
                    style={{ width: '100%' }}
                    onChange={date => handleDateChange(date)}
                />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
            </div>

            {/* upload image */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography style={{ marginRight: '10px' }}>Upload Image</Typography>
              <Input
                onChange={handleInput}
                name='image'
                type='file'
                accept='image/*'
              />
            </div>

            {/* submit button */}
            <Button
              type='submit'
              variant='contained'
              onClick={handleSubmit}
              style={{ backgroundColor: '#F2AE2E' }}
            >
              Set-Up Event
            </Button>
          </div>
        </form>
      </div>

      {/* mirror bg */}
      <div style={{ flex: 'none', width: '250px', position: 'relative', height: '100%'}}>
        <img
          src={bg}
          alt='background'
          style={{
            width: '88%',
            height: '100%',
            objectFit: 'cover',
            position: 'absolute',  // Change position to 'absolute'
            top: '0',
            left: 'auto',  // Remove left property
            right: '0',  // Add right property and set it to '0'
            transform: 'scaleX(-1)'
          }}
        />
      </div>
    </div>
  )
}