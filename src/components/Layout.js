import React from 'react'
import Drawer from './Drawer'

const Layout = ({ children }) => {
  return (
    <div>
      <Drawer />
      <div>{children}</div>
    </div>
  )
}

export default Layout
