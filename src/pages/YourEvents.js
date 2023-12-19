import React, { useState, useEffect, useContext } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import bg from '../assets/images/bg.jpg'
import axios from 'axios'
import { UserContext } from '../components/UserProvider'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'

export default function YourEvents() {
  const [rows, setRows] = useState([])
  const { user } = useContext(UserContext)

  useEffect(() => {
    if (user && user.id) {
      axios
        .get(`http://localhost:8080/your-events/${user.id}`)
        .then(response => {
          const formattedRows = response.data.map(row => ({
            ...row,
            formattedDate: formatEventDate(row.eventDate),
            cancelEvent: (
              <CancelEventDialog
                eventId={row.id}
                eventName={row.eventName}
                handleCancel={handleCancelEvent}
                updateRows={updatedRows => setRows(updatedRows)}
              />
            ),
          }))
          setRows(formattedRows)
        })
        .catch(error => {
          console.error('Error fetching data:', error)
        })
    }
    // eslint-disable-next-line
  }, [user])

  const formatEventDate = dateString => {
    const date = new Date(dateString)
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return date.toLocaleDateString(undefined, options)
  }

  const handleCancelEvent = eventId => {
    const eventData = { eventID: eventId }

    axios
      .post('http://localhost:8080/delete-event', eventData)
      .then(response => {
        console.log(response.data.message)
        console.log(`Event ${eventId} has been canceled.`)
        const updatedRows = rows.filter(row => row.id !== eventId)
        setRows(updatedRows)
      })
      .catch(error => {
        console.error('Error deleting event:', error)
      })
  }

  const CancelEventDialog = ({ eventId, eventName, handleCancel, updateRows }) => {
    const [open, setOpen] = useState(false)

    const handleClickOpen = () => {
      setOpen(true)
    }

    const handleClose = () => {
      setOpen(false)
    }

    const confirmCancelEvent = () => {
      handleClose()
      handleCancel(eventId)
    }

    return (
      <div>
        <Button variant='contained' color='error' onClick={handleClickOpen}>
          Cancel
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Confirm Event Cancellation</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to cancel the event "{eventName}"?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant='contained' color='warning'>
              No
            </Button>
            <Button variant='contained' color='error' onClick={confirmCancelEvent} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }

  const columns = [
    { field: 'formattedDate', headerName: 'Date', flex: 1 },
    { field: 'eventName', headerName: 'Event ', flex: 2 },
    { field: 'eventStatus', headerName: 'Status', flex: 1 },
    { field: 'eventType', headerName: 'Type', flex: 1 },
    { field: 'eventLocation', headerName: 'Location', flex: 2 },
    {
      field: 'participantCount',
      headerName: 'Participants',
      flex: 1,
      renderCell: params => <div>{params.row.participantCount}</div>,
    },
    {
      field: 'cancelEvent',
      headerName: 'Cancel Event',
      flex: 1,
      renderCell: params => (
        <CancelEventDialog
          eventId={params.row.id}
          eventName={params.row.eventName}
          handleCancel={handleCancelEvent}
        />
      ),
    },
  ]

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 65px)' }}>
      <div
        style={{
          flex: 'none',
          width: '250px',
          position: 'relative',
          height: '100%',
        }}
      >
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
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </div>
  )
}
