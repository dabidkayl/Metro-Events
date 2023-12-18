import React, { useState } from 'react'
import { styled, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import CssBaseline from '@mui/material/CssBaseline'
import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItem from '@mui/material/ListItem'
import EventIcon from '@mui/icons-material/Event'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch'
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard'
import GroupIcon from '@mui/icons-material/Group'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import AccountCircle from '@mui/icons-material/AccountCircle'
import { Link } from 'react-router-dom'
import ViewList from '@mui/icons-material/ViewList'
import Create from '@mui/icons-material/Create'

const drawerWidth = 250

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}))

export default function PersistentDrawer({ user }) {
  const theme = useTheme()
  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const userTypes = {
    organizer: [
      { text: 'Organize Events', link: '/create-event', iconIndex: 0 },
      { text: 'Your Events', link: '/your-events', iconIndex: 1 },
    ],
    user: [
      { text: 'Events', link: '/events', iconIndex: 2 },
      { text: 'Joined Events', link: '/joined-events', iconIndex: 3 },
    ],
    admin: [
      { text: 'Requests', link: '/requests', iconIndex: 4 },
      { text: 'Users', link: '/users', iconIndex: 5 },
      { text: 'Events', link: '/list-events', iconIndex: 6 },
    ],
  }

  const icons = [
    <Create />,
    <ContentPasteSearchIcon />,
    <ViewList />,
    <EventIcon />,
    <SpaceDashboardIcon />,
    <GroupIcon />,
    <EventIcon />,
  ]

  const drawerItems = userTypes[user.type]

  const handleMenu = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position='fixed' open={open} sx={{ backgroundColor: '#F2AE2E' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              onClick={handleDrawerOpen}
              edge='start'
              sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
            <Link
              to='/home'
              style={{
                textDecoration: 'none',
                color: 'white',
                flexGrow: 1,
                textAlign: 'center',
                cursor: 'pointer',
              }}
            >
              <Typography variant='h4' noWrap component='div'>
                <span style={{ fontWeight: 'bold', letterSpacing: '-3px' }}>METRO</span>{' '}
                <span
                  style={{
                    fontWeight: 200,
                    fontFamily: 'Nunito Sans, sans-serif',
                    letterSpacing: '5px',
                  }}
                >
                  GALA
                </span>
              </Typography>
            </Link>
          </div>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Typography style={{ marginRight: '10px' }}>
                {user.firstName} {user.lastName}
              </Typography>
              <IconButton
                size='large'
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleMenu}
                color='inherit'
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link to='/login' style={{ textDecoration: 'none' }}>
                    Logout
                  </Link>
                </MenuItem>
              </Menu>
            </div>
          ) : null}
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant='persistent'
        anchor='left'
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {drawerItems.map(item => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton component={Link} to={item.link}>
                <ListItemIcon>
                  {icons[item.iconIndex]} {/* Use the icon based on iconIndex */}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
    </Box>
  )
}
