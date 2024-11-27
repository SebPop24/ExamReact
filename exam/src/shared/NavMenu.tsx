import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';

const NavMenu: React.FC = () => {
  return (
    <Navbar expand="lg">
      <Navbar.Brand href="/">MyShop</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/items">Items</Nav.Link>
          <Nav.Link href="/about">About</Nav.Link>
          <NavDropdown title="Account" id="basic-nav-dropdown">
            <NavDropdown.Item href="/register">Register</NavDropdown.Item>
            <NavDropdown.Item href="/login">Log In</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavMenu;
