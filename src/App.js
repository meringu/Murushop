import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { PouchDB } from 'react-pouchdb'

import Header from './components/Header'
import Loader from './components/Loader'

const Home = lazy(() => import('./pages/Home'))
const Library = lazy(() => import('./pages/Library'))
const Edit = lazy(() => import('./pages/Edit'))

const App = () => (
  <BrowserRouter>
    <PouchDB name="murushop" auto_compaction={true}>
      <Header />
      <Suspense fallback={<Loader/>}>
        <Switch>
          <Route path="/edit/:id" component={Edit}/>
          <Route path="/library" component={Library} />
          <Route path="/" component={Home} />
        </Switch>
      </Suspense>
    </PouchDB>
  </BrowserRouter>
)

export default App
