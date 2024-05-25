import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import banner from "../images/home.jpg";
import venue from "../images/venue.jpg";
import community from "../images/community.jpg";

/**
 * function to generate the home page content and return html code for it, with links to various routes for navigation
 * @returns html code
 */
function Home() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <main>
      <Container fluid className=" pt-3 my-3 px-md-5">
        <Row className="mt-5 position-relative mx-md-5">
          <Col md={12}>
            <img
              className="w-100 overflow-hidden"
              src={banner}
              alt="banner for the home page"
            />
            {windowWidth > 420 ? (
              <h1 className="position-absolute bottom-50 start-50 translate-middle text-white">
                Book your dream vacation
              </h1>
            ) : (
              <h1 className="position-absolute bottom-50 start-0 rounded text-white mx-3">
                Book your dream vacation
              </h1>
            )}
            {windowWidth > 420 ? (
              <Link
                className="position-absolute top-50 start-50 translate-middle btn btn-primary w-25"
                to="/venues"
              >
                Book Now
              </Link>
            ) : (
              <Link
                className="position-absolute top-50 start-50 btn btn-primary w-25"
                to="/venues"
              >
                Book
              </Link>
            )}
          </Col>
        </Row>
        <Row className="mt-2 mx-md-5">
          <Col
            md={6}
            className="d-flex flex-column align-items-center justify-content-center bg-dark"
          >
            <h2 className="text-white">Need help to book and manage </h2>
            <Link
              className="float-center my-1 btn btn-outline-primary text-white"
              to="/guide"
            >
              Go to Guide
            </Link>
          </Col>
          <Col md={6} className="bg-info">
            <img
              className="w-100 overflow-hidden"
              src={venue}
              alt="inside of a hotel room"
            />
          </Col>
        </Row>
        <Row className="mx-md-5">
          <Col md={6} className="bg-info">
            <img
              className="w-100 overflow-hidden"
              src={community}
              alt="people working in a group in lobby"
            />
          </Col>
          <Col
            md={6}
            className="d-flex flex-column align-items-center justify-content-center bg-dark"
          >
            <h2 className="text-white"> Join the Holidaze community</h2>
            <Link
              className="float-center my-1 btn btn-outline-primary text-white"
              to="/Register"
            >
              Register Here
            </Link>
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default Home;
