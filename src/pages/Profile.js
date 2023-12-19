import React, { useContext, useState, useRef } from 'react'
import { UserContext } from '../components/UserProvider'
import bg from '../assets/images/bg.jpg'
import { TextField, Button } from '@mui/material'
import defaultProfilePic from '../assets/images/default-profile-pic.png'
import axios from 'axios'

export default function Profile() {
  const { user } = useContext(UserContext)
  const { setUser } = useContext(UserContext)
  const [editMode, setEditMode] = useState(false)
  const [userData, setUserData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: user.password,
    profilePic: user.profile_pic,
    profilePicPreview: user.profile_pic || defaultProfilePic,
    id: user.id,
    type: user.type,
  })

  const fileInputRef = useRef(null)

  const handleFileChange = event => {
    const file = event.target.files[0]
    setUserData(prevData => ({
      ...prevData,
      profilePic: file,
    }))
    if (file) {
      const reader = new FileReader()
      reader.onload = function (e) {
        setUserData(prevData => ({
          ...prevData,
          profilePicPreview: e.target.result,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleEditClick = () => {
    setEditMode(true)
  }

  const handleInputChange = event => {
    const { name, value } = event.target
    setUserData(prevData => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleClickProfilePic = () => {
    if (editMode) {
      fileInputRef.current.click()
    }
  }

  const preventDefaults = event => {
    event.preventDefault()
    event.stopPropagation()
  }

  const handleSubmit = e => {
    console.log(userData, user.id)
    e.preventDefault()
    const formData = new FormData()
    formData.append('firstName', userData.firstName)
    formData.append('lastName', userData.lastName)
    formData.append('password', userData.password)
    formData.append('email', userData.email)
    formData.append('userID', user.id)
    formData.append('profilePic', userData.profilePic)
    axios
      .post('http://localhost:8080/edit-profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => {
        setUser(userData)
        alert(res.data.message)
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
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '30px',
        }}
      >
        <div
          style={{
            border: '1px solid #F2AE2E',
            padding: '50px',
            maxWidth: '400px',
            width: '100%',
          }}
        >
          <form action='' onSubmit={handleSubmit}></form>
          <div
            onClick={handleClickProfilePic}
            onDrop={preventDefaults}
            onDragOver={preventDefaults}
            style={{
              cursor: editMode ? 'pointer' : 'default',
              textAlign: 'center',
              marginBottom: '20px',
            }}
          >
            <img
              src={userData.profilePicPreview}
              alt='Profile'
              style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover' }}
            />
            <input
              id='fileInput'
              type='file'
              accept='image/*'
              onChange={handleFileChange}
              ref={fileInputRef}
              style={{ display: 'none' }}
            />
          </div>
          <div style={{ textAlign: 'center' }}>
            <TextField
              label='First Name'
              id='outlined-basic'
              variant='outlined'
              style={{ width: '100%', marginBottom: '20px' }}
              disabled={!editMode}
              name='firstName'
              value={userData.firstName}
              onChange={handleInputChange}
            />
            <TextField
              label='Last Name'
              id='outlined-basic'
              variant='outlined'
              style={{ width: '100%', marginBottom: '20px' }}
              disabled={!editMode}
              name='lastName'
              value={userData.lastName}
              onChange={handleInputChange}
            />
            <TextField
              label='Email'
              id='outlined-basic'
              variant='outlined'
              style={{ width: '100%', marginBottom: '20px' }}
              disabled={!editMode}
              name='email'
              value={userData.email}
              onChange={handleInputChange}
            />
            <TextField
              label='Change Password'
              id='outlined-basic'
              variant='outlined'
              style={{ width: '100%', marginBottom: '20px' }}
              disabled={!editMode}
              type='password'
              name='password'
              onChange={handleInputChange}
            />
          </div>
          <div style={{ textAlign: 'center' }}>
            {!editMode && (
              <Button
                variant='contained'
                onClick={handleEditClick}
                style={{ backgroundColor: '#F2AE2E', marginRight: '10px', width: '85px' }}
              >
                Edit
              </Button>
            )}
            <Button
              onClick={handleSubmit}
              variant='contained'
              style={{ backgroundColor: '#F2AE2E', width: '200px' }}
            >
              Update
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
