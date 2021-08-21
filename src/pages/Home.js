import React, { useState, useEffect } from 'react'

import { useDB } from 'react-pouchdb'

import Container from 'react-bootstrap/Container'
import Spinner from 'react-bootstrap/Spinner'
import Table from 'react-bootstrap/Table'

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
    <Container>
      {info
        ? <Table striped bordered hover>
          <thead>
            <tr>
              <th>Key</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(info).sort().map(key =>
              <tr key={key}>
                <td>{key}</td>
                <td>{JSON.stringify(info[key])}</td>
              </tr>
            )}
          </tbody>
        </Table>
        : <Spinner animation="border" />
      }
    </Container>
  )
}

export default Home
