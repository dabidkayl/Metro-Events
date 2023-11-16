import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Login from './pages/Login'
import Home from './pages/Home'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Review from './pages/Review'
import Register from './pages/Register'

const theme = createTheme({
  typography: {
    fontFamily: 'Nunito Sans, sans-serif',
  },
})

function App() {
  return (
    <BrowserRouter>
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
                </Routes>
              </Layout>
            }
          />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
