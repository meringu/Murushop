import React, { Suspense, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useHistory, useParams } from 'react-router-dom'
import { useGet } from 'react-pouchdb'

import Delete from '../components/Delete'
import Loader from '../components/Loader'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'

// redirects to the user's library if the image doesn't exist or has been deleted
const Redirector = ({ id }) => {
  const history = useHistory()

  const image = useGet({
    id: id
  })

  useEffect(() => {
    if (!image || image._deleted) {
      history.push('/library')
    }
  }, [image])

  return <></>
}

Redirector.propTypes = {
  id: PropTypes.string
}

const Picture = ({ id }) => {
  const image = useGet({
    id: id,
    attachments: true
  })

  return (
    <Image
      fluid
      src={'data:image/jpeg;base64,' + ((!image || image._deleted) ? '' : image._attachments.original.data)}
    />
  )
}

Picture.propTypes = {
  id: PropTypes.string
}

const Edit = () => {
  const { id } = useParams()

  return (
    <Container>
      <Suspense fallback={<></>}>
        <Redirector id={id} />
      </Suspense>
      <Row>
        <Col md={4}>
          <div className="mt-3">
            <Delete id={id} />
          </div>
        </Col>
        <Col md={8}>
          <div className="mt-3">
            <Suspense
              fallback={
                <Loader />
              }
            >
              <Picture id={id} />
            </Suspense>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Edit
