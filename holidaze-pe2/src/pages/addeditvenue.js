import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import { userDetails } from "../util/userdetails";

const venueUrl = "https://v2.api.noroff.dev/holidaze/venues";

function CreateNewVenue(CreateVenue) {
  return (
    <div className="container">
      <div className="row mb-5">
        <div className="col"></div>
        <div className="col-sm-10">
          <h1 className="text-center">Create a new venue</h1>
          <p className="text-center mt-1 mb-4" id="userFeedback">
            Enter venue information below
          </p>
          <form
            onSubmit={CreateVenue}
            className="need-validation border border-dark rounded"
          >
            <div className="form-group my-4 mx-3">
              <label htmlFor="name">Venue name</label>
              <input
                type="text"
                className="form-control"
                autoComplete="on"
                required
                id="name"
                aria-label="name"
              />
            </div>
            <div className="form-group my-4 mx-3">
              <label htmlFor="description">Description</label>
              <input
                type="textbox"
                className="form-control"
                autoComplete="on"
                required
                id="description"
              />
              <small id="descriptiontext" className="form-text text-muted">
                Add a few words about your venue
              </small>
            </div>
            <div className="form-group my-4 mx-3">
              <label htmlFor="image">Image</label>
              <input
                type="url"
                className="form-control"
                autoComplete="on"
                id="image"
              />
              <small id="imagetext" className="form-text text-muted">
                To add an image to your venue, please include the image URL
              </small>
            </div>
            <div className="form-group my-4 mx-3">
              <label htmlFor="price">Price</label>
              <input
                type="text"
                className="form-control"
                autoComplete="off"
                required
                id="price"
                aria-label="price"
              />
            </div>
            <div className="form-group my-4 mx-3">
              <label htmlFor="guests">Max Guests</label>
              <input
                type="text"
                className="form-control"
                autoComplete="off"
                required
                id="guests"
                aria-label="guests"
              />
            </div>

            <button
              type="submit"
              id="SubmitButton"
              className="btn btn-dark mb-3"
            >
              Create
            </button>
          </form>
        </div>
        <div className="col"></div>
      </div>
    </div>
  );
}

function UpdateExistingVenue(
  name,
  description,
  image,
  price,
  maxGuests,
  UpdateVenue,
) {
  return (
    <div className="container">
      <div className="row mb-5">
        <div className="col"></div>
        <div className="col-sm-10">
          <h1 className="text-center">Edit venue</h1>
          <p className="text-center mt-1 mb-4" id="userFeedback">
            Enter venue information below
          </p>
          <form
            onSubmit={UpdateVenue}
            className="need-validation border border-dark rounded"
          >
            <div className="form-group my-4 mx-3">
              <label htmlFor="name">Venue name</label>
              <input
                type="text"
                className="form-control"
                autoComplete="on"
                id="name"
                aria-label="name"
                placeholder={name}
              />
            </div>
            <div className="form-group my-4 mx-3">
              <label htmlFor="description">Description</label>
              <input
                type="textbox"
                className="form-control"
                autoComplete="on"
                id="description"
                placeholder={description}
              />
              <small id="descriptiontext" className="form-text text-muted">
                Add a few words about your venue
              </small>
            </div>
            <div className="form-group my-4 mx-3">
              <label htmlFor="image">Image</label>
              <input
                type="url"
                className="form-control"
                autoComplete="on"
                id="image"
                placeholder={image}
              />
              <small id="imagetext" className="form-text text-muted">
                To add an image to your venue, please include the image URL
              </small>
            </div>
            <div className="form-group my-4 mx-3">
              <label htmlFor="price">Price</label>
              <input
                type="text"
                className="form-control"
                autoComplete="on"
                id="price"
                placeholder={price}
                aria-label="price"
              />
            </div>
            <div className="form-group my-4 mx-3">
              <label htmlFor="guests">Max Guests</label>
              <input
                type="text"
                className="form-control"
                autoComplete="on"
                id="guests"
                placeholder={maxGuests}
                aria-label="guests"
              />
            </div>

            <button
              type="submit"
              id="SubmitButton"
              className="btn btn-dark mb-3"
            >
              Update
            </button>
          </form>
        </div>
        <div className="col"></div>
      </div>
    </div>
  );
}

async function VenueUpdate(event, token, key, id, navigate, username) {
  event.preventDefault();

  const name =
    event.target[0].value.length > 0
      ? event.target[0].value
      : event.target[0].placeholder;
  const description =
    event.target[1].value.length > 0
      ? event.target[1].value
      : event.target[1].placeholder;
  const image =
    event.target[2].value.length > 0
      ? event.target[2].value
      : event.target[2].placeholder;
  const price =
    event.target[3].value.length > 0
      ? Number(event.target[3].value)
      : Number(event.target[3].placeholder);
  const maxGuests =
    event.target[4].value.length > 0
      ? Number(event.target[4].value)
      : Number(event.target[4].placeholder);

  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": key,
    },
    body: JSON.stringify({
      name: name,
      description: description,
      media: [
        {
          url: image,
          alt: "venue main image",
        },
      ],
      price: price,
      maxGuests: maxGuests,
    }),
  };
  const response = await fetch(venueUrl + "/" + id, requestOptions);
  const json = await response.json();
  if (response.ok) {
    navigate("../profile/" + username);
  } else {
    alert(json.errors[0].message);
  }
}

async function VenueCreate(event, token, key, navigate, username) {
  event.preventDefault();
  const name = event.target[0].value;
  const description = event.target[1].value;
  const image =
    event.target[2].value.length > 0
      ? event.target[2].value
      : "https://saterdesign.com/cdn/shop/products/property-placeholder_a9ec7710-1f1e-4654-9893-28c34e3b6399_2000x.jpg?v=1500393334";
  const price = Number(event.target[3].value);
  const maxGuests = Number(event.target[4].value);

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": key,
    },
    body: JSON.stringify({
      name: name,
      description: description,
      media: [
        {
          url: image,
          alt: "venue main image",
        },
      ],
      price: price,
      maxGuests: maxGuests,
    }),
  };
  const response = await fetch(venueUrl, requestOptions);
  const json = await response.json();
  if (response.ok) {
    navigate("../profile/" + username);
  } else {
    alert(json.errors[0].message);
  }
}

function GetVenueInfo(
  id,
  setName,
  setDescription,
  setImage,
  setPrice,
  setMaxGuests,
) {
  useEffect(() => {
    async function getData() {
      const response = await fetch(venueUrl + "/" + id);
      const json = await response.json();

      if (response.ok) {
        setName(json.data.name);
        setDescription(json.data.description);
        json.data.media.length > 0
          ? setImage(json.data.media[0].url)
          : setImage("");
        setPrice(json.data.price);
        setMaxGuests(json.data.maxGuests);
      } else {
        alert(json.errors[0].message);
      }
    }
    getData();
  });
}

function AddEditVenue() {
  const params = useParams();
  const token = userDetails((state) => state.accessToken);
  const key = userDetails((state) => state.apiKey);
  const loggedIn = userDetails((state) => state.loggedIn);
  const username = userDetails((state) => state.name);
  const navigate = useNavigate();

  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState();
  const [price, setPrice] = useState();
  const [maxGuests, setMaxGuests] = useState();

  let addeditvenue = "";
  const UpdateVenue = async (event) => {
    VenueUpdate(event, token, key, params.id, navigate, username);
  };
  const CreateVenue = async (event) => {
    VenueCreate(event, token, key, navigate, username);
  };

  if (loggedIn) {
    if (params.id === "new") {
      addeditvenue = CreateNewVenue(CreateVenue);
    } else {
      GetVenueInfo(
        params.id,
        setName,
        setDescription,
        setImage,
        setPrice,
        setMaxGuests,
      );
      addeditvenue = UpdateExistingVenue(
        name,
        description,
        image,
        price,
        maxGuests,
        UpdateVenue,
      );
    }
  } else {
    addeditvenue = "Please login to view this content";
  }

  return (
    <main>
      <Container>
        <Row className="justify-content-center mt-5 pt-5">{addeditvenue}</Row>
      </Container>
    </main>
  );
}

export default AddEditVenue;
