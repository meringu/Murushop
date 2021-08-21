import React, { useState, useEffect } from 'react'

import { useDB } from 'react-pouchdb'

const Home = () => {
  const db = useDB()

  const [info, setInfo] = useState(null)
  useEffect(() => {
    let mounted = true

    db.info().then(info => {
      if (mounted) {
        setInfo(info)
      }
    })

    return () => (mounted = false)
  }, [])

  return (
    <p>
      {info ? JSON.stringify(info) : 'loading...'}
    </p>
  )
}

export default Home
