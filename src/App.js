import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Login from './pages/Login'
import Home from './pages/Home'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Requests from './pages/Requests'
import Register from './pages/Register'
import Events from './pages/Events'
import User from './pages/User'
import EventDetails from './components/EventDetails'
import { UserProvider } from './components/UserProvider'
import { EventProvider } from './components/EventProvider'
const theme = createTheme({
  typography: {
    fontFamily: 'Nunito Sans, sans-serif',
  },
})

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <EventProvider>
          <ThemeProvider theme={theme}>
            <Routes>
              <Route index element={<Login />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route
                path='/*'
                element={
                  <Layout>
                    <Routes>
                      <Route index element={<Home />} />
                      <Route path='/dashboard' element={<Dashboard />} />
                      <Route path='/requests' element={<Requests />} />
                      <Route path='/users' element={<User />} />
                      <Route path='/home' element={<Home />} />
                      <Route path='/events' element={<Events />} />
                      <Route path='/events/:eventID' element={<EventDetails />} />
                    </Routes>
                  </Layout>
                }
              />
            </Routes>
          </ThemeProvider>
        </EventProvider>
      </UserProvider>
    </BrowserRouter>
  )
}

export default App
