import React from "react";
import { Accordion, Container } from "react-bootstrap";

/**
 * function to generate the guide page content and return html code for it
 * @returns html code
 */
function Guide() {
  return (
    <main>
      <h1 className="text-dark pt-5 my-5"> User Guide</h1>
      <Container className="px-md-5">
        <h2 className="px-md-5 pt-3 text-start">
          {" "}
          Registration, Login and Profile
        </h2>
        <Accordion data-bs-theme="light" className="px-md-4">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Register a User/Venue manager</Accordion.Header>
            <Accordion.Body>
              <ol>
                <li key={0}></li>
              </ol>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Login to Profile</Accordion.Header>
            <Accordion.Body>
              <ol>
                <li key={0}></li>
              </ol>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Edit/change my profile avatar </Accordion.Header>
            <Accordion.Body>
              <ol>
                <li key={0}></li>
              </ol>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <h2 className="px-md-5 pt-5 text-start">Venues, Search and Booking</h2>
        <Accordion data-bs-theme="light" className="px-md-4">
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              How do I find and search venues{" "}
            </Accordion.Header>
            <Accordion.Body>
              <ol>
                <li key={0}></li>
              </ol>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Create a new booking to a venue</Accordion.Header>
            <Accordion.Body>
              <ol>
                <li key={0}></li>
              </ol>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>View my existing bookings</Accordion.Header>
            <Accordion.Body>
              <ol>
                <li key={0}></li>
              </ol>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <h2 className="px-md-5 pt-5 text-start">Managing your Venues</h2>
        <Accordion data-bs-theme="light" className="px-md-4">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Create a new venue</Accordion.Header>
            <Accordion.Body>
              <ol>
                <li key={0}></li>
              </ol>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Edit existing venue</Accordion.Header>
            <Accordion.Body>
              <ol>
                <li key={0}></li>
              </ol>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Remove/delete a venue</Accordion.Header>
            <Accordion.Body>
              <ol>
                <li key={0}></li>
              </ol>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>View bookings to your venues</Accordion.Header>
            <Accordion.Body>
              <ol>
                <li key={0}></li>
              </ol>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>
    </main>
  );
}

export default Guide;
