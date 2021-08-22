import React, { Suspense, useState } from 'react'
import PropTypes from 'prop-types'
import { useDB, useGet } from 'react-pouchdb'

import Loader from './Loader'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Image from 'react-bootstrap/Image'
import Spinner from 'react-bootstrap/Spinner'

const Preview = ({ id }) => {
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

Preview.propTypes = {
  id: PropTypes.string
}

const Delete = ({ id }) => {
  const db = useDB()

  const [deleting, setDeleting] = useState(false)

  const [show, setShow] = useState(false)
  const handleClose = () => {
    setDeleting(false)
    setShow(false)
  }
  const handleShow = () => setShow(true)

  const handleSubmit = (event) => {
    setDeleting(true)
    event.preventDefault()
    db.get(id).then(doc => db.remove(doc)).then(handleClose)
  }

  return (
    <>
      <Button variant="danger" onClick={handleShow}>
        Delete
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Delete image</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>
              Are you sure you want to delete this image?
              Deletion is permenant and cannot be undone.
            </p>
            <Suspense
              fallback={
                <Loader />
              }
            >
              <Preview id={id}/>
            </Suspense>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="danger" type="submit" disabled={deleting}>
              {
                deleting
                  ? <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    <span className="visually-hidden">Loading...</span>
                  </>
                  : 'Delete Permanently'
              }
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}

Delete.propTypes = {
  id: PropTypes.string
}

export default Delete
