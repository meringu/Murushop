import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { PouchDB } from 'react-pouchdb'

import Header from './Header'

import Library from './pages/Library'
import Home from './pages/Home'

const App = () => (
  <BrowserRouter>
    <PouchDB name="murushop" auto_compaction={true}>
      <Header />
      <Switch>
        <Route path="/library">
          <Library />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </PouchDB>
  </BrowserRouter>
)

export default App
