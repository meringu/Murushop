import React, { useState } from 'react'

import { useDB } from 'react-pouchdb'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Image from 'react-bootstrap/Image'

const Import = () => {
  const db = useDB()

  const [show, setShow] = useState(false)
  const handleClose = () => {
    setPreview(null)
    setShow(false)
  }
  const handleShow = () => setShow(true)

  const [preview, setPreview] = useState(null)
  const onChange = (event) => {
    const files = event.currentTarget.files

    if (files.length > 0 && files[0]) {
      const reader = new FileReader()
      reader.onload = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(files[0])
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const form = event.currentTarget

    if (form.checkValidity() === false) {
      event.stopPropagation()
      return
    }

    const name = form.elements.fileInput.files[0].name
    const reader = new FileReader()
    reader.onload = () => {
      db.post({ name: name, type: 'image', data: reader.result })
      setShow(false)
    }
    reader.readAsDataURL(form.elements.fileInput.files[0])
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Import
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Import</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form.Group className="mb-3" controlId="fileInput">
              <Form.Label>Choose an image</Form.Label>
              <Form.Control
                onChange={onChange}
                type="file"
                placeholder="choose image"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please choose an image.
              </Form.Control.Feedback>
              <Form.Text className="text-muted">
                Select an image to upload to Murushop
              </Form.Text>
            </Form.Group>
            <Image
              fluid
              src={preview}
            />
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit" disabled={preview === null}>
              Import
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}

export default Import
