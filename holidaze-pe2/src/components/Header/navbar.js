import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Nav, Navbar} from 'react-bootstrap';
import { userDetails } from '../../util/userdetails';

function NavBar() {
  const loggedIn = userDetails((state) => state.loggedIn);
  const username = userDetails((state) => state.name);
  const clear = userDetails((state) => state.clear);
  return (
    <Navbar expand="md" className="fixed-top" bg='dark'>
      <Container>
        <Navbar.Brand className="text-info">Holidaze</Navbar.Brand>
        <Navbar.Toggle className="bg-light" aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="align-items-center">
            <Nav.Item><Link className="text-light mx-2" to="/">Home</Link></Nav.Item>
            <Nav.Item><Link className="text-light mx-2" to="/venues">Venues</Link></Nav.Item>
            <Nav.Item>{loggedIn?<Link className="text-light mx-2" to="/profile">{username}</Link>:<Link></Link>}</Nav.Item>
            <Nav.Item>{loggedIn? <Link className='text-light mx-2 btn btn-outline-success' onClick={function(){clear()}} to="/">Log out</Link> : <Link className='text-light mx-2 btn btn-outline-success' to='/login'>Login</Link>}</Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;