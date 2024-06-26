import React from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";
import { userDetails } from "../../util/userdetails";
import logo from "../../images/logo.png";

/**
 * function that generates the navigation bar component of the website including logic for dynamic population of theelements such as login and logout
 * @returns html code of navigation bar
 */
function NavBar() {
  const loggedIn = userDetails((state) => state.loggedIn);
  const username = userDetails((state) => state.name);
  const clear = userDetails((state) => state.clear);
  return (
    <Navbar
      collapseOnSelect
      expand="md"
      className="fixed-top border-bottom px-5"
      bg="white"
    >
      <Navbar.Brand className="text-dark w-25 text-start">
        <Link className="text-dark text-decoration-none " to="/">
          <img
            className="w-25"
            src={logo}
            alt="site logo"
            style={{ minWidth: "90px" }}
          />
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
              <div className="btn btn-outline-info text-dark">Log out</div>
            </Nav.Link>
          ) : (
            <Nav.Link eventKey={4} as={Link} className="mx-2" to="/login">
              <div className="btn btn-outline-info text-dark">Login</div>
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
