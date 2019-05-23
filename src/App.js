import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Router } from '@reach/router';

import SignIn from './pages/SignIn';
import RouteList from './pages/RouteList';
import Route from './pages/Route';

function App() {
  return (
    <div className='App'>
      <Router>
        <SignIn path='signin' />
        <RouteList path='routes' />
        <Route path='route/:routeId' />
      </Router>
    </div>
  );
}

export default App;
