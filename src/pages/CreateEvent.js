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
    image: null,
  })

  const handleInput = e => {
    setValues(prev => ({ ...prev, [e.target.name]: [e.target.value] }))
  }

  const handleDateChange = date => {
    setValues(prev => ({ ...prev, date: date }))
  }

  const handleSubmit = e => {
    console.log(values)
    e.preventDefault()

    const formData = new FormData()
    formData.append('event', values.event)
    formData.append('organizer', values.organizer)
    formData.append('description', values.description)
    formData.append('location', values.location)
    formData.append('type', values.type)
    formData.append('date', values.date)
    formData.append('image', values.image)

    axios
      .post('http://localhost:8080/create-events', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => {
        alert('Successfully set up an event')
      })
      .catch(err => console.log(err))
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
          overflow: 'auto',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
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
            <div style={{ textAlign: 'center' }}>
              <h2>CREATE EVENT</h2>
            </div>

            <div style={{ display: 'flex', gap: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <Typography style={{ marginRight: '10px' }}>Event</Typography>
                <TextField onChange={handleInput} name='event' variant='outlined' />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Typography style={{ marginRight: '10px' }}>Organizer</Typography>
                <TextField onChange={handleInput} name='organizer' variant='outlined' />
              </div>
            </div>
            <div>
              <Typography style={{ marginRight: '10px' }}>Description</Typography>
              <TextField
                onChange={handleInput}
                name='description'
                variant='outlined'
                multiline
                rows={3}
                style={{ width: '600px' }}
              />
            </div>
            <div>
              <Typography style={{ marginRight: '10px' }}>Location</Typography>
              <TextField
                onChange={handleInput}
                name='location'
                variant='outlined'
                style={{ width: '600px' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Typography style={{ marginRight: '10px' }}>Event Type</Typography>
                <TextField
                  onChange={handleInput}
                  name='type'
                  variant='outlined'
                  style={{ width: '320px', marginTop: '8px' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <Typography style={{ marginRight: '10px' }}>Date</Typography>
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
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography style={{ marginRight: '10px' }}>Upload Image</Typography>
              <Input
                onChange={e => setValues({ ...values, image: e.target.files[0] })}
                name='image'
                type='file'
                accept='image/*'
                sx={{
                  marginRight: '10px',
                }}
              />
            </div>

            <Button
              type='submit'
              variant='contained'
              onClick={handleSubmit}
              style={{ backgroundColor: '#F2AE2E' }}
            >
              Set Up Event
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
