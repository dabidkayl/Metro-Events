import React, { useState, useEffect, useContext } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import bg from '../assets/images/bg.jpg'
import axios from 'axios'
import { UserContext } from '../components/UserProvider'

export default function JoinedEvents() {
  const [rows, setRows] = useState([])
  const { user } = useContext(UserContext)

  useEffect(() => {
    if (user && user.id) {
      axios
        .get(`http://localhost:8080/joined-events/${user.id}`)
        .then(response => {
          setRows(response.data)
        })
        .catch(error => {
          console.error('Error fetching joined events:', error)
        })
    }
  }, [user])

  const columns = [
    { field: 'userID', headerName: 'ID', flex: 1 },
    { field: 'fullName', headerName: 'Name', flex: 2 },
    { field: 'email', headerName: 'Email', flex: 2 },
    { field: 'password', headerName: 'Password', flex: 2 },
    { field: 'user_type', headerName: 'Role', flex: 1 },
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
          checkboxSelection
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </div>
  )
}
