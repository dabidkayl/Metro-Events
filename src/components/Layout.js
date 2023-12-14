import Drawer from './Drawer'
import React, { useContext } from 'react'
import { UserContext } from '../components/UserProvider'

const Layout = ({ children }) => {
  const { user } = useContext(UserContext)
  return (
    <div>
      <Drawer user={user} />
      <div style={{ marginTop: '65px' }}>{children}</div>
    </div>
  )
}

export default Layout
