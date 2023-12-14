import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import bg from '../assets/images/bg.jpg'
import axios from 'axios'
import { Button } from '@mui/material'

export default function Requests() {
  const [rows, setRows] = useState([])
  const [userID, setUserID] = useState('')

  const columns = [
    { field: 'requestID', headerName: 'ID', flex: 1 },
    { field: 'fullName', headerName: 'Name', flex: 2 },
    { field: 'status', headerName: 'Status', flex: 1 },
    { field: 'formattedDate', headerName: 'Date Requested', flex: 2 },
    {
      field: 'Actions',
      headerName: 'Actions',
      flex: 2,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: params => (
        <div onClick={e => e.stopPropagation()}>
          <CustomActions row={params.row} />
        </div>
      ),
    },
  ]

  const handleButtonClick = row => {
    axios
      .post('http://localhost:8080/request/action', {
        requestID: row.requestID,
        action: 'Approve',
        userID: userID,
      })
      .then(res => {
        if (res.data.success) {
          alert('Approved')
        }
      })
      .catch(err => console.log(err))
  }

  const handleAnotherButtonClick = row => {
    axios
      .post('http://localhost:8080/request/action', {
        requestID: row.requestID,
        action: 'Decline',
        userID: userID,
      })
      .then(res => {
        if (res.data.success) {
          alert('Declined')
        }
      })
      .catch(err => console.log(err))
  }

  const CustomActions = ({ row }) => (
    <div>
      <Button
        variant='contained'
        style={{ marginRight: '8px', backgroundColor: '#4CAF50', width: '130px' }}
        onClick={event => {
          event.stopPropagation() // Prevent row selection
          handleButtonClick(row)
        }}
      >
        Approve
      </Button>
      <Button
        variant='contained'
        style={{ backgroundColor: '#FF0000', width: '130px' }}
        onClick={event => {
          event.stopPropagation() // Prevent row selection
          handleAnotherButtonClick(row)
        }}
      >
        Decline
      </Button>
    </div>
  )

  useEffect(() => {
    axios
      .get('http://localhost:8080/requests')
      .then(response => {
        const updatedRows = response.data.map((row, index) => {
          setUserID(row.userID)
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
          checkboxSelection
          style={{ width: '100%', height: '100%' }}
          onCellClick={params => {
            // Prevent row selection on button click
            if (params.field === 'customActions' && params.event) {
              params.event.stopPropagation()
            }
          }}
        />
      </div>
    </div>
  )
}
