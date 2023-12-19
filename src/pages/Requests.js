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

  const handleButtonClick = (row, action) => {
    console.log(userID)
    console.log(row.requestID)
    console.log(action)
    if (row.status !== 'Approved' && row.status !== 'Declined') {
      axios
        .post('http://localhost:8080/request/action', {
          requestID: row.requestID,
          action: action === 'Approve' ? 'Approve' : 'Decline',
          userID: userID,
        })
        .then(res => {
          console.log(res.data)
          if (res.data.success) {
            const updatedRows = rows.map(r => {
              if (r.requestID === row.requestID) {
                return { ...r, status: action === 'Approve' ? 'Approved' : 'Declined' }
              }
              return r
            })
            setRows(updatedRows)
          }
        })
        .catch(err => console.log(err))
    }
  }

  const CustomActions = ({ row }) => (
    <div>
      {row.status !== 'Approved' && row.status !== 'Declined' && (
        <>
          <Button
            variant='contained'
            style={{
              marginRight: '8px',
              backgroundColor: '#4CAF50',
              width: '110px',
              marginLeft: -9,
            }}
            onClick={() => handleButtonClick(row, 'Approve')}
          >
            Approve
          </Button>
          <Button
            variant='contained'
            style={{ backgroundColor: '#FF0000', width: '110px' }}
            onClick={() => handleButtonClick(row, 'Decline')}
          >
            Decline
          </Button>
        </>
      )}
    </div>
  )

  useEffect(() => {
    axios
      .get('http://localhost:8080/requests')
      .then(response => {
        console.log(response.data)
        const updatedRows = response.data.map((row, index) => {
          setUserID(response.data[0].userID)
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
        />
      </div>
    </div>
  )
}
