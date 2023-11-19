import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import bg from '../assets/images/bg.jpg'
import axios from 'axios'
import { Button } from '@mui/material'

export default function User() {
  const [rows, setRows] = useState([])

  const columns = [
    { field: 'requestID', headerName: 'ID', flex: 1 },
    { field: 'fullName', headerName: 'Name', flex: 2 },
    { field: 'status', headerName: 'Status', flex: 1 },
    { field: 'formattedDate', headerName: 'Date Requested', flex: 2 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 3,
      renderCell: params => (
        <div>
          <Button
            variant='contained'
            style={{ marginRight: '8px', backgroundColor: '#4CAF50', width: '130px' }}
            onClick={() => handleButtonClick(params.row)}
          >
            Approve
          </Button>
          <Button
            variant='contained'
            style={{ backgroundColor: '#FF0000', width: '130px' }}
            onClick={() => handleAnotherButtonClick(params.row)}
          >
            Decline
          </Button>
        </div>
      ),
    },
  ]

  // Function to handle button click
  const handleButtonClick = row => {
    // Logic for the first button click
    console.log('Button 1 clicked for row:', row)
  }

  const handleAnotherButtonClick = row => {
    // Logic for the second button click
    console.log('Button 2 clicked for row:', row)
  }

  useEffect(() => {
    axios
      .get('http://localhost:8080/requests')
      .then(response => {
        const updatedRows = response.data.map((row, index) => {
          const date = new Date(row.requestDate)
          const options = { year: 'numeric', month: 'long', day: 'numeric' }
          const formattedDate = date.toLocaleDateString(undefined, options)

          return {
            ...row,
            id: index + 1,
            formattedDate: formattedDate,
            fullName: `${row.first_name.charAt(0).toUpperCase()}${row.first_name.slice(
              1,
            )} ${row.last_name.charAt(0).toUpperCase()}${row.last_name.slice(1)}`,
          }
        })
        setRows(updatedRows)
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
      <div style={{ flex: '1', width: 'calc(100% - 250px)', overflow: 'hidden', height: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pagination
          pageSize={5}
          // checkboxSelection
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </div>
  )
}
