import React, { useState, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { useDB } from 'react-pouchdb'

import Loader from '../components/Loader'

import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'

const Home = () => {
  const db = useDB()

  // Load the db info only once
  const [info, setInfo] = useState(null)
  useEffect(() => {
    db.info().then(info => {
      setInfo(info)
    })
  }, [])

  // Navigates to / on any 404
  const location = useLocation()
  const history = useHistory()
  useEffect(() => {
    if (location.pathname !== '/') {
      history.push('/')
    }
  }, [location])

  return (
    <Container>
      {info
        ? <div className="mt-3">
          <Table striped bordered hover>
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
        </div>
        : <Loader />
      }
    </Container>
  )
}

export default Home
