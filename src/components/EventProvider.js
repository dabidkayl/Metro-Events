import React, { createContext, useState } from 'react'

export const EventContext = createContext()

export const EventProvider = ({ children }) => {
  const [selectedEvent, setSelectedEvent] = useState(null)

  return (
    <EventContext.Provider value={{ selectedEvent, setSelectedEvent }}>
      {children}
    </EventContext.Provider>
  )
}
