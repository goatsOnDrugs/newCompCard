import React from 'react';
import './App.css';
import { Router } from '@reach/router';

import Layout from './components/layout/Layout';
import Login from './pages/Login';
import RouteList from './pages/RouteList';
import Route from './pages/Route';
import Home from './pages/Home';

function App() {
  return (
    <Layout>
      <div className='App'>
        <Router>
          <Home path='/' />
          <Login path='login' />
          <RouteList path='routes' />
          <Route path='route' />
        </Router>
      </div>
    </Layout>
  );
}

export default App;
