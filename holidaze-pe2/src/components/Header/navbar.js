import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Nav, Navbar} from 'react-bootstrap';


function NavBar() {
  return (
    <Navbar expand="md" className="fixed-top" bg='dark'>
      <Container>
        <Navbar.Brand className="text-info">Holidaze</Navbar.Brand>
        <Navbar.Toggle className="bg-light" aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="align-items-center">
            <Nav.Item><Nav.Link><Link className="text-light" to="/">Home</Link></Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link><Link className="text-light" to="/venues">Venues</Link></Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link><Link className="text-light" to="/profile">Profile</Link></Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link><Link className="text-light btn btn-outline-success" to="/login">Login</Link></Nav.Link></Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;