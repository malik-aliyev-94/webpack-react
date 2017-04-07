import React from 'react';
import styles from './App.css';
import {observer} from "mobx-react";
import Alert from 'react-bootstrap/lib/Alert';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';

import NavItem from 'react-bootstrap/lib/NavItem';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';

@observer
export default class App extends React.Component {
  render() {
    const navbarInstance = (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">Webpack-react</a>
          </Navbar.Brand>
          <Navbar.Toggle/>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href="#">Link</NavItem>
            <NavItem eventKey={2} href="#">Link</NavItem>
            <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>Action</MenuItem>
              <MenuItem eventKey={3.2}>Another action</MenuItem>
              <MenuItem eventKey={3.3}>Something else here</MenuItem>
              <MenuItem divider/>
              <MenuItem eventKey={3.3}>Separated link</MenuItem>
            </NavDropdown>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} href="#">Link Right</NavItem>
            <NavItem eventKey={2} href="#">Link Right</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );

    return <div className={styles.app}>
      {navbarInstance}
      <Alert bsStyle="warning">
        <strong>Holy guacamole!</strong>
        Best check yo self, you're not looking too good.
      </Alert>
      <h1>
        --- Test MobX Dev Tools --
      </h1>
      <p>{this.props.store.title}</p>
      <i>{this.props.store.author}</i>
      <br/>
      <b>{this.props.store.age}</b>
    </div>
  }
}