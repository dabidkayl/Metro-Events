import React, { useState, useEffect, useContext } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import bg from '../assets/images/bg.jpg'
import axios from 'axios'
import { UserContext } from '../components/UserProvider'

const formatEventDate = dateString => {
  const date = new Date(dateString)
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return date.toLocaleDateString(undefined, options)
}

export default function JoinedEvents() {
  const [rows, setRows] = useState([])
  const { user } = useContext(UserContext)

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:8080/joined-events/${user.id}`)
        .then(response => {
          const formattedRows = response.data.map(row => ({
            ...row,
            eventDate: formatEventDate(row.eventDate),
          }))
          setRows(formattedRows)
        })
        .catch(error => {
          console.error('Error fetching joined events:', error)
        })
    }
  }, [user])

  const columns = [
    { field: 'id', headerName: 'Event ID', flex: 1 },
    { field: 'eventName', headerName: 'Event Name', flex: 2 },
    { field: 'eventDate', headerName: 'Date', flex: 2 },
    { field: 'eventLocation', headerName: 'Location', flex: 2 },
    { field: 'eventStatus', headerName: 'Status', flex: 1 },
  ]

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
      <div style={{ flex: '1', width: 'calc(100% - 250px)', overflow: 'hidden', height: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pagination
          pageSize={5}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </div>
  )
}
