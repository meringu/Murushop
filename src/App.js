import React, { lazy } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { PouchDB } from 'react-pouchdb'

import Header from './components/Header'

const Home = lazy(() => import('./pages/Home'))
const Library = lazy(() => import('./pages/Library'))
const Edit = lazy(() => import('./pages/Edit'))

const App = () => (
  <BrowserRouter>
    <PouchDB name="murushop" auto_compaction={true}>
      <Header />
      <Switch>
        <Route path="/edit/:id" component={Edit}/>
        <Route path="/library" component={Library} />
        <Route path="/" component={Home} />
      </Switch>
    </PouchDB>
  </BrowserRouter>
)

export default App
