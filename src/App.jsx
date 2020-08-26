import React from 'react';
import { BrowserRouter as Router, Link, Switch } from 'react-router-dom';
import renderRoutes from 'router';
import 'App.css';
import { Avatar, Col, Row } from 'antd';
import MainLogo from 'assets/images/logo_github_3.png';

function App() {
  return (
    <Router>
      <Row className="container">
        <Col xs={24} className="d-flex justify-content-center mt-4">
          <Link to="/">
            <Avatar src={MainLogo} size={150} className="App-logo" alt={''} />
          </Link>
        </Col>
        <Col xs={24} className="mt-4">
          <h2 style={{ textAlign: 'center' }} className="font-space">
            <strong>GITHUB EASY FIND</strong>
          </h2>
        </Col>
      </Row>

      <Switch>{renderRoutes()}</Switch>
    </Router>
  );
}

export default App;
