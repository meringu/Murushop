import React, { useEffect, useState } from 'react'

import { useDB } from 'react-pouchdb'

import Import from '../components/Import'

import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Spinner from 'react-bootstrap/Spinner'

const Library = () => {
  const db = useDB()

  const [images, setImages] = useState(null)
  useEffect(() => {
    let mounted = true

    db.find({
      selector: {
        name: { $gte: null },
        type: 'image'
      },
      sort: ['name']
    }).then(images => {
      if (mounted) {
        setImages(images.docs)
      }
    })

    return () => (mounted = false)
  }, [])

  return (
    <Container>
      <Import />
      <p>Images:</p>
      <ul>
        {images
          ? images.map(image => (
            <li key={image._id}>
              {image.name}
              <img
                height="100"
                width="100"
                src={image.data}
              />
              <Button
                variant="danger"
                onClick={() => db.remove(image)}
              >
                Remove
              </Button>
            </li>
          ))
          : <Spinner animation="border" />
        }
      </ul>
    </Container>
  )
}

export default Library
