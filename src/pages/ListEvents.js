import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import bg from '../assets/images/bg.jpg'
import axios from 'axios'

const columns = [
  { field: 'eventID', headerName: 'ID', flex: 1 },
  { field: 'eventName', headerName: 'Event', flex: 2 },
  { field: 'eventDate', headerName: 'Date', flex: 2 },
  { field: 'eventLocation', headerName: 'Location', flex: 2 },
  { field: 'eventStatus', headerName: 'Status', flex: 1 },
]

const formatEventDate = dateString => {
  const date = new Date(dateString)
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return date.toLocaleDateString(undefined, options)
}

export default function User() {
  const [rows, setRows] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:8080/events')
      .then(response => {
        const formattedRows = response.data.map((row, index) => ({
          ...row,
          id: index + 1,
          eventDate: formatEventDate(row.eventDate), // Apply date formatting
        }))
        setRows(formattedRows) // Set rows state with the formatted date
      })
      .catch(error => {
        console.error('Error fetching data:', error)
      })
  }, [])

  // Function to generate unique IDs for rows
  const getRowId = row => row.id

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
          getRowId={getRowId} // Specify the function to generate unique IDs
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </div>
  )
}
