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
              <ol className="text-start">
                <li key={0}>Go to the registration page </li>
                <li key={1}>Fill in all the required information in the form </li>
                <li key={1}>(Optional) check off on venue manager if you want to manage venues</li>
                <li key={2}>Click register button at the bottom </li>
              </ol>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Login to Profile</Accordion.Header>
            <Accordion.Body >
              <ol className="text-start">
                <li key={0}>Go to the login page </li>
                <li key={1}>Fill in all the required information in the form  </li>
                <li key={2}>Click login button at the bottom </li>
              </ol>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Edit/change my profile avatar </Accordion.Header>
            <Accordion.Body>
              <ol className="text-start">
                <li key={0}>Go to the profile page </li>
                <li key={1}>Select the change avatar tab  </li>
                <li key={2}>Fill in the new image URL and click update  </li>
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
              <ol className="text-start">
                <li key={0}>Go to the venues catalog page </li>
                <li key={1}>(Optional) if you have a specifc venue in mind, type in the search field for dynamic search  </li>
                <li key={2}>Select the venue you are interested in by clicking view  </li>
              </ol>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Create a new booking to a venue</Accordion.Header>
            <Accordion.Body>
              <ol className="text-start">
                <li key={0}>Once you have selected a specific venue </li>
                <li key={1}>Go to the bottom of the page to view the booking form (Note: if you are owner of the venue, you wll not see the booking option)  </li>
                <li key={2}>Fill out the information needed and click book  </li>
              </ol>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>View my existing bookings</Accordion.Header>
            <Accordion.Body>
              <ol className="text-start">
                <li key={0}>Go to your profile page </li>
                <li key={1}>Click the bookings tab  </li>
                <li key={2}>You can now see a list of your bookings, and can click on the view button to see the venue details  </li>
              </ol>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>Delete an existing booking</Accordion.Header>
            <Accordion.Body>
              <ol className="text-start">
                <li key={0}>Go to your profile page </li>
                <li key={1}>Click the bookings tab  </li>
                <li key={2}>You can now see a list of your bookings, and can click on the delete button to remove booking  </li>
              </ol>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <h2 className="px-md-5 pt-5 text-start">Managing your Venues</h2>
        <p className="px-md-5 text-start">(Functionality for venue managers only)</p>
        <Accordion data-bs-theme="light" className="px-md-4">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Create a new venue</Accordion.Header>
            <Accordion.Body>
              <ol className="text-start">
                <li key={0}>Go to your profile page </li>
                <li key={1}>Click the create venue button  </li>
                <li key={2}>Fill in all the necessary fields and click Create  </li>
              </ol>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Edit existing venue</Accordion.Header>
            <Accordion.Body>
              <ol className="text-start">
                <li key={0}>Go to your profile page </li>
                <li key={1}>Click the my venues tab  </li>
                <li key={2}>You will now see a list of venues you manage</li>
                <li key={3}>Click on the edit button of the venue you want to update</li>
                <li key={4}>Fill in all the necessary fields and click update </li>
              </ol>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Remove/delete a venue</Accordion.Header>
            <Accordion.Body>
              <ol className="text-start">
                <li key={0}>Go to your profile page </li>
                <li key={1}>Click the my venues tab  </li>
                <li key={2}>You will now see a list of venues you manage</li>
                <li key={3}>Click on the delete button of the venue you want to remove</li>
              </ol>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>View bookings to your venues</Accordion.Header>
            <Accordion.Body>
              <ol className="text-start">
                <li key={0}>Go to your profile page </li>
                <li key={1}>Click the my venues tab  </li>
                <li key={2}>You will now see a list of venues you manage</li>
                <li key={3}>Click on the view bookings button of the venue you want to examine</li>
                <li key={4}>At the bottom of the venue page you can see a list of all the bookings made </li>
              </ol>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>
    </main>
  );
}

export default Guide;
