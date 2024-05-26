import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import { userDetails } from "../util/userdetails";

const venueUrl = "https://v2.api.noroff.dev/holidaze/venues";

/**
 * function to generate the html code of the form to create a new venue
 * @param {function} CreateVenue a callback function to create a new venue based on form values
 * @param {String} error a string containing any error messages generated
 * @returns html code
 */
function CreateNewVenue(CreateVenue, error) {
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
              To add images to your venue, please include the image URLs seperated by ","
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
            <p className="text-danger text-center my-3">{error}</p>
            <button
              type="submit"
              id="SubmitButton"
              className="btn btn-success mb-3"
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

/**
 * function to generate the html code of the form to update an existing venue
 * @param {String} name the venue name as placeholder for edits
 * @param {String} description the venue description as placeholder for edits
 * @param {String} image the venue imageURL as placeholder for edits
 * @param {Number} price the venue price as placeholder for edits
 * @param {Number} maxGuests the venue mac guests as placeholder for edits
 * @param {function} UpdateVenue a callback function to update the venue info
 * @param {String} error a string containing any error messages generated
 * @returns html code
 */
function UpdateExistingVenue(
  name,
  description,
  image,
  price,
  maxGuests,
  UpdateVenue,
  error,
) {
    let images = "";
    if(image===undefined||image===""){
        images=""; 
    }else{
        for (let index = 0; index < image.length; index++) {
            images += image[index].url.toString();
            if(index+1 < image.length){
                images += ", "
            }
        }
    }
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
                defaultValue={name}
              />
            </div>
            <div className="form-group my-4 mx-3">
              <label htmlFor="description">Description</label>
              <input
                type="textbox"
                className="form-control"
                autoComplete="on"
                id="description"
                defaultValue={description}
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
                defaultValue={images}
              />
              <small id="imagetext" className="form-text text-muted">
                To add images to your venue, please include the image URLs seperated by ","
              </small>
            </div>
            <div className="form-group my-4 mx-3">
              <label htmlFor="price">Price</label>
              <input
                type="text"
                className="form-control"
                autoComplete="on"
                id="price"
                defaultValue={price}
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
                defaultValue={maxGuests}
                aria-label="guests"
              />
            </div>
            <p className="text-danger text-center my-3">{error}</p>
            <button
              type="submit"
              id="SubmitButton"
              className="btn btn-success mb-3"
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

/**
 * function using the Noroff API to edit an existing venue
 * @param {Event} event event containing the key information of the submitted form
 * @param {*} token user token for the logeed in user
 * @param {*} key api key to use the Noroff API
 * @param {useNavigate} navigate a call to route to navigate to after successful submission
 * @param {String} username the name of the logged in user
 * @param {function} setError a callback to set an error message
 */
async function VenueUpdate(
  event,
  token,
  key,
  id,
  navigate,
  username,
  setError,
) {
  event.preventDefault();

  const name =
    event.target[0].value;
  const description =
    event.target[1].value;
  const image =
    event.target[2].value;
  const price =
    Number(event.target[3].value);
  const maxGuests =
    Number(event.target[4].value);

  let imagesArray = image.split(', ');
  for (let index = 0; index < imagesArray.length; index++) {
    imagesArray[index] = {url: imagesArray[index], alt: "venue image"+index.toString()};
  }
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
      media: imagesArray,
      price: price,
      maxGuests: maxGuests,
    }),
  };
  const response = await fetch(venueUrl + "/" + id, requestOptions);
  const json = await response.json();
  if (response.ok) {
    navigate("../profile/" + username);
  } else {
    setError(json.errors[0].message);
  }
}

/**
 * function using the Noroff API to generate a new venue
 * @param {Event} event event containing the key information of the submitted form
 * @param {*} token user token for the logeed in user
 * @param {*} key api key to use the Noroff API
 * @param {useNavigate} navigate a call to route to navigate to after successful submission
 * @param {String} username the name of the logged in user
 * @param {function} setError a callback to set an error message
 */
async function VenueCreate(event, token, key, navigate, username, setError) {
  event.preventDefault();
  const name = event.target[0].value;
  const description = event.target[1].value;
  const image =
    event.target[2].value.length > 0
      ? event.target[2].value
      : "https://saterdesign.com/cdn/shop/products/property-placeholder_a9ec7710-1f1e-4654-9893-28c34e3b6399_2000x.jpg?v=1500393334";
  const price = Number(event.target[3].value);
  const maxGuests = Number(event.target[4].value);

  let imagesArray = image.split(', ');
  for (let index = 0; index < imagesArray.length; index++) {
    imagesArray[index] = {url: imagesArray[index], alt: "venue image"+index.toString()};
  }

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
      media: imagesArray,
      price: price,
      maxGuests: maxGuests,
    }),
  };
  const response = await fetch(venueUrl, requestOptions);
  const json = await response.json();
  if (response.ok) {
    navigate("../profile/" + username);
  } else {
    setError(json.errors[0].message);
  }
}

/**
 * function that fetches information of an existing venue to get values for the editing
 * @param {*} id venue identifier
 * @param {function} setName a callback function to set the name of the venue
 * @param {function} setDescription a callback function to set the description of the venue
 * @param {function} setImage a callback function to set the image of the venue
 * @param {function} setPrice a callback function to set the price of the venue
 * @param {function} setMaxGuests a callback function to set the max guests of the venue
 */
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
          ? setImage(json.data.media)
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

/**
 * function that generates the creation or editing components of a venue
 * @returns html code
 */
function AddEditVenue() {
  const params = useParams();
  const token = userDetails((state) => state.accessToken);
  const key = userDetails((state) => state.apiKey);
  const loggedIn = userDetails((state) => state.loggedIn);
  const username = userDetails((state) => state.name);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState();
  const [price, setPrice] = useState();
  const [maxGuests, setMaxGuests] = useState();

  let addeditvenue = "";
  const UpdateVenue = async (event) => {
    VenueUpdate(event, token, key, params.id, navigate, username, setError);
  };
  const CreateVenue = async (event) => {
    VenueCreate(event, token, key, navigate, username, setError);
  };

  if (loggedIn) {
    if (params.id === "new") {
      addeditvenue = CreateNewVenue(CreateVenue, error);
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
        error,
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
