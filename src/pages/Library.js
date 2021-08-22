import React, { Suspense } from 'react'
import PropTypes from 'prop-types'
import { LinkContainer } from 'react-router-bootstrap'
import { useGet, useFind } from 'react-pouchdb'

import Import from '../components/Import'
import Loader from '../components/Loader'

import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Spinner from 'react-bootstrap/Spinner'

const Image = ({ id }) => {
  const image = useGet({
    id: id,
    attachments: true
  })

  return (
    <Card.Img
      variant="top"
      src={'data:image/jpeg;base64,' + image._attachments.original.data}
    />
  )
}

Image.propTypes = {
  id: PropTypes.string
}

const Images = () => {
  const images = useFind({
    selector: {
      type: 'image'
    }
  })

  if (images.length === 0) {
    return (
      <p>
        There aren{"'"}t any images in your library yet. Import an image to get started.
      </p>
    )
  }

  return (
    <Row>
      {images.map(image => (
        <Col key={image._id} md={3} xs={12}>
          <div className="mt-3">
            <LinkContainer to={`/edit/${image._id}`}>
              <Card>
                <Suspense
                  fallback={
                    <Loader />
                  }
                >
                  <Image id={image._id} />
                </Suspense>
                <Card.Footer className="text-muted">{image.name}</Card.Footer>
              </Card>
            </LinkContainer>
          </div>
        </Col>
      ))}
    </Row>
  )
}

const Library = () => {
  return (
    <Container>
      <div className="mt-3">
        <Import />
      </div>
      <Suspense
        fallback={
          <div className="m-3 d-flex justify-content-center">
            <Spinner animation="border" />
          </div>
        }
      >
        <Images />
      </Suspense>
    </Container>
  )
}

export default Library
