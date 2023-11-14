import './App.css'
import Drawer from './components/Drawer'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme({
  typography: {
    fontFamily: 'Nunito Sans, sans-serif',
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Drawer />
      <h1>This is a test.</h1>
    </ThemeProvider>
  )
}

export default App
