import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Carousel,
  ListGroup,
  ListGroupItem,
  Form,
  Spinner,
} from "react-bootstrap";
import { userDetails } from "../util/userdetails";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";

const venueUrl = "https://v2.api.noroff.dev/holidaze/venues/";
const bookingUrl = "https://v2.api.noroff.dev/holidaze/bookings";

function GetVenueInfo(
  id,
  setImages,
  setOwnerName,
  setUserBookings,
  setVenueInfo,
) {
  // The useEffect will run once when the component first mounts
  useEffect(() => {
    async function getData() {
      const response = await fetch(
        venueUrl + id + "?_owner=true&_bookings=true",
      );
      const json = await response.json();

      if (response.ok) {
        setVenueInfo(json.data);
        setImages(json.data.media);
        setOwnerName(json.data.owner.name);
        setUserBookings(json.data.bookings);
      } else {
        alert(json.errors[0].message);
      }
    }
    getData();
  }, [id, setImages, setOwnerName, setUserBookings, setVenueInfo]);
}

async function BookingCreate(
  dateFrom,
  dateTo,
  numberOfGuests,
  token,
  key,
  venueId,
  username,
  navigate,
  setError,
) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": key,
    },
    body: JSON.stringify({
      dateFrom: new Date(dateFrom),
      dateTo: new Date(dateTo),
      guests: Number(numberOfGuests),
      venueId: venueId,
    }),
  };
  const response = await fetch(bookingUrl, requestOptions);
  const json = await response.json();
  if (response.ok) {
    navigate("../profile/" + username);
  } else {
    setError(json.errors[0].message);
  }
}

function GetCarosel(images) {
  if (images.length > 0) {
    return images.map((image) => (
      <Carousel.Item key={image.url}>
        <img
          style={{ maxHeight: "70vh" }}
          className="w-100"
          src={image.url}
          alt={image.alt}
        />
      </Carousel.Item>
    ));
  } else {
    return (
      <Carousel.Item>
        <img
          style={{ maxHeight: "70vh" }}
          className="w-100"
          src="https://saterdesign.com/cdn/shop/products/property-placeholder_a9ec7710-1f1e-4654-9893-28c34e3b6399_2000x.jpg?v=1500393334"
          alt="placeholder for venue with no images"
        />
      </Carousel.Item>
    );
  }
}

function GetVenue(venueInfo) {
  if (venueInfo === "") {
    return (
      <Spinner className="my-3" animation="border" role="status"></Spinner>
    );
  } else {
    return (
      <Row className="mt-5 mx-1 ">
        <Col md={5} lg={6}>
          <Row>
            {" "}
            <p>
              Managed by:{" "}
              <Link
                className="text-dark"
                to={`/profile/${venueInfo.owner.name}`}
              >
                {venueInfo.owner.name}
              </Link>
            </p>
          </Row>
          <Row>
            {" "}
            <p>
              Contact:{" "}
              <a className="text-dark" href={`mailto:${venueInfo.owner.email}`}>
                {venueInfo.owner.email}{" "}
              </a>
            </p>
          </Row>
          <Row>
            {" "}
            <p>Max.Guests: {venueInfo.maxGuests}</p>
          </Row>
          <Row>
            {" "}
            <p>Price: {venueInfo.price} $</p>{" "}
          </Row>
        </Col>
        <Col md={7} lg={6}>
          <Row>
            {" "}
            <p>Description:</p>
            <p>{venueInfo.description.substring(0, 400)} </p>
          </Row>
          <Row>
            {" "}
            <p>
              Amminites: {venueInfo.meta.pets ? "Pets | " : ""}{" "}
              {venueInfo.meta.parking ? "Parking | " : ""}{" "}
              {venueInfo.meta.wifi ? "Wifi | " : ""}{" "}
              {venueInfo.meta.breakfast ? "Breakfast " : ""}
            </p>
          </Row>
        </Col>
      </Row>
    );
  }
}

function GetBooking(
  userBookings,
  loggedIn,
  CreateBooking,
  dateFromChanged,
  dateToChanged,
  numGuestsChanged,
  error,
) {
  const disableBookedDates = (date) => {
    if (userBookings === "") {
      return false;
    } else {
      let dayBooked = false;
      userBookings.forEach((booking) => {
        const firstDay = new Date(booking.dateFrom);
        const lastDay = new Date(booking.dateTo);

        //calculate days difference
        var daysDifference =
          (lastDay.getTime() - firstDay.getTime()) / (1000 * 60 * 60 * 24);

        if (
          date.$d.getDate() === firstDay.getDate() &&
          date.$d.getMonth() === firstDay.getMonth() &&
          date.$d.getYear() === firstDay.getYear()
        ) {
          dayBooked = true;
        }

        for (let index = 0; index < daysDifference; index++) {
          const day = new Date(firstDay.setDate(firstDay.getDate() + 1));
          if (
            date.$d.getDate() === day.getDate() &&
            date.$d.getMonth() === day.getMonth() &&
            date.$d.getYear() === day.getYear()
          ) {
            dayBooked = true;
          }
        }
      });
      return dayBooked;
    }
  };

  if (loggedIn) {
    return (
      <Container className="my-3 border rounded px-5 py-2">
        <h2 className="text-center mb-3">Book this venue</h2>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Row className="my-3 justify-content-center mt-3">
            <Col md={4}>
              <p className="mx-3 mt-3">Date From:</p>
              <Container components={["DatePicker"]}>
                <DatePicker
                  className="bg-white"
                  onChange={dateFromChanged}
                  disablePast
                  shouldDisableDate={disableBookedDates}
                />
              </Container>
            </Col>
            <Col md={4}>
              <p className="mx-3 mt-3">Date To:</p>
              <Container components={["DatePicker"]}>
                <DatePicker
                  className="bg-white"
                  onChange={dateToChanged}
                  disablePast
                  shouldDisableDate={disableBookedDates}
                />
              </Container>
            </Col>
            <Col md={4}>
              <label htmlFor="numberOfGuests" className="text-center mx-3 mt-3">
                Guests:
              </label>
              <Form.Control
                style={{ height: "55px" }}
                aria-label="number of guests"
                id="numberOfGuests"
                name="numOfGuests"
                type="text"
                className="form-control mt-3 w-50 mx-3"
                onChange={numGuestsChanged}
              ></Form.Control>
            </Col>
          </Row>
          <Row className="justify-content-center mt-3">
            <Col md={4}></Col>
            <Col md={4} className="text-center border-top border-dark mt-3">
              <p className="text-danger text-center my-3">{error}</p>
              <button
                className="btn btn-success my-3 w-50"
                onClick={CreateBooking}
              >
                Book
              </button>
            </Col>
            <Col md={4}></Col>
          </Row>
        </LocalizationProvider>
      </Container>
    );
  } else {
    return <p className="text-center">Please log in to book this venue</p>;
  }
}

function GetVenueBookings(userBookings) {
  if (userBookings.length > 0) {
    const bookings = userBookings.map((booking) => (
      <ListGroupItem key={booking.id}>
        <div className="float-start">
          <p>
            <Link
              className="text-dark"
              to={`/profile/${booking.customer.name}`}
            >
              {booking.customer.name}
            </Link>{" "}
            with {booking.guests} guests
          </p>
        </div>
        <div className="float-end">
          <p>
            From: {new Date(booking.dateFrom).toLocaleDateString()} To:{" "}
            {new Date(booking.dateTo).toLocaleDateString()}
          </p>
        </div>
      </ListGroupItem>
    ));
    return (
      <ListGroup>
        <h2 className="text-center">Bookings to your venue</h2>
        {bookings}
      </ListGroup>
    );
  } else {
    return (
      <Container className="text-center">
        <h2>Bookings to your venue</h2>
        <p className="pt-2">Currently no bookings to this venue</p>
      </Container>
    );
  }
}

function Venue() {
  const params = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [images, setImages] = useState([
    "https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif",
  ]);
  const [ownerName, setOwnerName] = useState("");
  const [userBookings, setUserBookings] = useState("");
  const [venueInfo, setVenueInfo] = useState("");
  GetVenueInfo(
    params.id,
    setImages,
    setOwnerName,
    setUserBookings,
    setVenueInfo,
  );

  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState("");

  const token = userDetails((state) => state.accessToken);
  const key = userDetails((state) => state.apiKey);
  const username = userDetails((state) => state.name);
  const loggedIn = userDetails((state) => state.loggedIn);
  const venueManager = userDetails((state) => state.venueManager);

  const CreateBooking = async (event) => {
    BookingCreate(
      dateFrom,
      dateTo,
      numberOfGuests,
      token,
      key,
      params.id,
      username,
      navigate,
      setError,
    );
  };

  const dateFromChanged = (event) => {
    if (event != null) {
      setDateFrom(event.$d);
    }
  };
  const dateToChanged = (event) => {
    if (event != null) {
      setDateTo(event.$d);
    }
  };
  const numGuestsChanged = (event) => {
    setNumberOfGuests(event.target.value);
  };

  const carosel = GetCarosel(images);
  const venueInformation = GetVenue(venueInfo);
  const bookingVenue = GetBooking(
    userBookings,
    loggedIn,
    CreateBooking,
    dateFromChanged,
    dateToChanged,
    numGuestsChanged,
    error,
  );
  const myVenueBookings = GetVenueBookings(userBookings);

  return (
    <main>
      <Container className="text-start px-md-5">
        <h1 className="pt-5 mt-5">{venueInfo.name}</h1>
        <Row className="justify-content-center">
          <Carousel className="text-center" data-bs-theme="dark">
            {carosel}
          </Carousel>
        </Row>
        {venueInformation}
        {ownerName === username && venueManager ? (
          <Row className="border-top py-4"> {myVenueBookings}</Row>
        ) : (
          <Row>{bookingVenue}</Row>
        )}
      </Container>
    </main>
  );
}

export default Venue;
