import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Login from './pages/Login'
import Home from './pages/Home'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Review from './pages/Review'
import Register from './pages/Register'
import User from './pages/User'
import { UserProvider } from './components/UserProvider'
const theme = createTheme({
  typography: {
    fontFamily: 'Nunito Sans, sans-serif',
  },
})

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route
              path='/*'
              element={
                <Layout>
                  <Routes>
                    <Route index element={<Home />} />
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/review' element={<Review />} />
                    <Route path='/users' element={<User />} />
                    <Route path='/home' element={<Home />} />
                  </Routes>
                </Layout>
              }
            />
          </Routes>
        </ThemeProvider>
      </UserProvider>
    </BrowserRouter>
  )
}

export default App
