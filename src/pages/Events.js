import React, { useEffect, useState, useContext } from 'react'
import { Grid } from '@mui/material'
import bg from '../assets/images/bg.jpg'
import EventCard from '../components/EventCard'
import axios from 'axios'
import { EventContext } from '../components/EventProvider'
import { Link } from 'react-router-dom'

export default function Events() {
  const [events, setEvents] = useState([])
  const { setSelectedEvent } = useContext(EventContext)

  const handleEventClick = event => {
    console.log(event)
    setSelectedEvent(event)
  }

  useEffect(() => {
    axios
      .get('http://localhost:8080/events')
      .then(response => {
        const eventsWithImageUrls = response.data.map(event => ({
          ...event,
          imageUrl: `http://localhost:8080/images/${event.image}`,
        }))
        setEvents(eventsWithImageUrls)
      })
      .catch(error => {
        console.error('Error fetching data:', error)
      })
  }, [])

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
      <div style={{ flex: '1', width: 'calc(100% - 250px)', overflow: 'auto', height: '100%' }}>
        <div style={{ marginLeft: '95px', marginTop: '20px' }}>
          <Grid container spacing={2}>
            {events.map(event => (
              <Link
                key={event.eventId}
                to={`/events/${event.eventID}`}
                style={{ textDecoration: 'none' }}
                onClick={() => handleEventClick(event)}
              >
                <EventCard
                  key={event.eventID}
                  title={event.eventName}
                  description={event.eventDescription}
                  image={event.imageUrl}
                />
              </Link>
            ))}
          </Grid>
        </div>
      </div>
    </div>
  )
}
