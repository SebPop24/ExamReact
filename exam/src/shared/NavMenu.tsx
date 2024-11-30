import React from 'react';
import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';
import '../css/Layout.css';

const NavMenu: React.FC = () => {
  return (
    <header> 
        <Navbar expand="lg" className="navbar-custom">
          <Container fluid>
            <Navbar.Brand href="/">
              <img
                src="./images/logo.png"
                height="40"
                className="d-inline-block align-top me-2"
                alt="Logo"
                style={{ marginBottom: '5px' }}
              />
            <div className="highlight-text">My Nutrition Tracker</div>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/items">Items</Nav.Link>
                <Nav.Link href="/about">About</Nav.Link>
                <NavDropdown title="Account" id="basic-nav-dropdown" align="end" className='dropmenu'>
                  {/* Assuming you're handling login/logout here */}
                  <NavDropdown.Item href="/register">Register</NavDropdown.Item>
                  <NavDropdown.Item href="/login">Log In</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
  );
};

export default NavMenu;