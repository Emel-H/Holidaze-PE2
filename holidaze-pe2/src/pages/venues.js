import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Form,
  Card,
  Container,
  Row,
  Spinner,
  ListGroup,
} from "react-bootstrap";

const url = "https://v2.api.noroff.dev/holidaze/venues?page=";

/**
 * function to call the Noroff API and retrievee all the venue infromation to then display it
 * @param {String} search the value of the search bar
 * @returns html code
 */
function GetVenues(search) {
  const [venues, setVenues] = useState([]);
  // State for holding our loading state
  const [isLoading, setIsLoading] = useState(true);
  // State for holding our error state
  const [isError, setIsError] = useState(false);

  // The useEffect will run once when the component first mounts
  useEffect(() => {
    async function getData() {
      try {
        // Reset the error state in case there as an error previously
        setIsError(false);
        // Turn on the loading state each time we do an API call
        setIsLoading(true);
        let page = 1;
        let morePages = true;
        let allVenues = [];
        while (morePages) {
          const response = await fetch(url + page.toString() + "&_owner=true");
          const json = await response.json();
          if (response.ok) {
            allVenues.push(...json.data);
            if (json.meta.pageCount > page) {
              page++;
            } else {
              morePages = false;
            }
          } else {
            alert(json.errors[0].message);
          }
        }
        // Setting our `venues` state to the API data we received
        allVenues.reverse();
        setVenues(allVenues);
        // Clear the loading state once we've successfully got our data
        setIsLoading(false);
      } catch (error) {
        // Clear the loading state if we get an error and then
        // set our error state to true
        setIsLoading(false);
        setIsError(true);
      }
    }
    getData();
  }, []);

  if (isLoading) {
    return (
      <Spinner className="my-3" animation="border" role="status"></Spinner>
    );
  } else if (isError) {
    return <h2>Error loading data from our servers</h2>;
  } else {
    return PopulateVenues(venues, search);
  }
}

/**
 * a function that generates html code for the veneue catalog based on the search value and teh list of venues
 * @param {Array} venues list of venues
 * @param {String} search the value of the search bar
 * @returns html code
 */
function PopulateVenues(venues, search) {
  const pop = venues.filter(
    (venue) =>
      venue.name.toLowerCase().includes(search.toLowerCase()) ||
      venue.description.toLowerCase().includes(search.toLowerCase()),
  );
  if (pop.length > 0) {
    return pop.map((venue) => (
      <Card className=" m-3" style={{ width: "18rem" }} key={venue.id}>
        <Card.Header>
          {venue.media.length > 0 ? (
            <Card.Img
              className="w-100"
              variant="top"
              src={venue.media[0].url}
              alt={venue.media[0].alt}
            />
          ) : (
            <Card.Img
              style={{ maxHeight: "18vh" }}
              className="w-100"
              variant="top"
              src="https://saterdesign.com/cdn/shop/products/property-placeholder_a9ec7710-1f1e-4654-9893-28c34e3b6399_2000x.jpg?v=1500393334"
              alt="stock image of venue"
            />
          )}
        </Card.Header>
        <Card.Body>
          <Card.Title aria-level={2} role="heading">
            {venue.name}{" "}
          </Card.Title>
          <Card.Text>
            Managed by{" "}
            <Link className="text-dark" to={`/profile/${venue.owner.name}`}>
              {venue.owner.name}
            </Link>
          </Card.Text>
          {venue.location.city === null || venue.location.country === null ? (
            ""
          ) : (
            <Card.Text>
              {venue.location.city}, {venue.location.country}{" "}
            </Card.Text>
          )}
        </Card.Body>
        <ListGroup>
          <ListGroup.Item> Max guests: {venue.maxGuests} </ListGroup.Item>
          <ListGroup.Item> Price: {venue.price} $ </ListGroup.Item>
        </ListGroup>
        <Link className="btn btn-info mt-1 mb-1" to={`/venue/${venue.id}`}>
          View
        </Link>
      </Card>
    ));
  } else {
    return (
      <h3 className="my-3"> No match to your search, try something else. </h3>
    );
  }
}

/**
 * function to generate teh venues catalog page html code
 * @returns html code
 */
function Venues() {
  const [searchValue, setSearchValue] = useState("");

  function OnSearchChange(event) {
    setSearchValue(event.target.value);
  }

  const venues = GetVenues(searchValue);

  return (
    <main>
      <h1 className="text-dark pt-5 mt-5">Venues Catalog</h1>
      <Container>
        <Row className="justify-content-center mt-5">
          <Form.Control
            aria-label="search field"
            autoComplete="off"
            name="search"
            className="my-4 w-75"
            type="text"
            onChange={OnSearchChange}
            placeholder="Search"
          />
        </Row>
        <Row className="justify-content-center">{venues}</Row>
      </Container>
    </main>
  );
}

export default Venues;
