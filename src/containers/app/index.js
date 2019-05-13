import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Home from '../home'
import About from '../about'
import Group from '../group'
import Product from '../product'

const App = () => (
  <div>
    <Router>
      <header>
        <Link to="/">Home</Link>
        <Link to="/about-us">About</Link>
        <Link to="/group">Group</Link>
        <Link to="/product">Product</Link>
      </header>

      <main>
        <Route exact path="/" component={Home} />
        <Route exact path="/about-us" component={About} />
        <Route path="/group/:id" component={Group} />
        <Route path="/product/:id" component={Product} />
      </main>
    </Router>
  </div>
)

export default App
