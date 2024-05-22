import React from "react";
import { Link } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import { userDetails } from "../../util/userdetails";

function NavBar() {
  const loggedIn = userDetails((state) => state.loggedIn);
  const username = userDetails((state) => state.name);
  const clear = userDetails((state) => state.clear);
  return (
    <Navbar
      collapseOnSelect
      expand="md"
      className="fixed-top border-bottom"
      bg="white"
    >
      <Container>
        <Navbar.Brand className="text-dark">
          <Link className="text-dark mx-2 text-decoration-none" to="/">
            HOLIDAZE
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle className="bg-light" aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <Nav.Link
              eventKey={0}
              as={Link}
              className="py-3 text-dark mx-2"
              to="/"
            >
              Home
            </Nav.Link>
            <Nav.Link
              eventKey={1}
              as={Link}
              className="py-3 text-dark mx-2"
              to="/guide"
            >
              Guide
            </Nav.Link>
            <Nav.Link
              eventKey={2}
              as={Link}
              className="py-3 text-dark mx-2"
              to="/venues"
            >
              Venues
            </Nav.Link>
            {loggedIn ? (
              <Nav.Link
                eventKey={3}
                as={Link}
                className="py-3 text-dark mx-2"
                to={`/profile/${username}`}
              >
                Hi, {username}
              </Nav.Link>
            ) : (
              ""
            )}
            {loggedIn ? (
              <Nav.Link
                eventKey={4}
                as={Link}
                className="mx-2"
                onClick={function () {
                  clear();
                }}
                to="/"
              >
                <div className="text-dark btn btn-outline-info">Log out</div>
              </Nav.Link>
            ) : (
              <Nav.Link eventKey={4} as={Link} className="mx-2" to="/login">
                <div className="text-dark btn btn-outline-info">Login</div>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
