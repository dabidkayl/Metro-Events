import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Home() {
  const [data, setData] = useState([])
  console.log('hello')
  useEffect(() => {
    axios
      .get('http://localhost:8080/users')
      .then(response => {
        // Handle successful response
        setData(response.data)
        console.log('hello')
        console.log(response.data)
      })
      .catch(error => {
        // Handle error
        console.error('Error fetching data:', error)
      })
  }, [])
  return (
    <div>
      {/* Display fetched data */}
      {data.map(item => (
        <p key={item.id}>{item.email}</p>
      ))}
    </div>
  )
}
