import React from 'react'
import ReactDOM from 'react-dom'

import 'bootstrap/dist/css/bootstrap.min.css'

import App from './App.js'

if (module.hot) {
  module.hot.accept()
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
