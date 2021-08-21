import React from 'react'

import { useDB, useFind } from 'react-pouchdb'

import Import from '../components/Import'

import Button from 'react-bootstrap/Button'

const Library = () => {
  const images = useFind({
    selector: {
      name: { $gte: null },
      type: 'image'
    },
    sort: ['name']
  })

  const db = useDB()

  return (
    <>
      <Import />
      <p>Images:</p>
      <ul>
        {images.map(image => (
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
        ))}
      </ul>
    </>
  )
}

export default Library
