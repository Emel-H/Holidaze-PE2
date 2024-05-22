import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import { Container, Row, Col, Spinner, Accordion, Card, Image, Stack } from 'react-bootstrap';
import { userDetails } from '../util/userdetails';

const venueUrl = "https://v2.api.noroff.dev/holidaze/venues/";
const bookingUrl = "https://v2.api.noroff.dev/holidaze/bookings/";
const profileUrl = "https://v2.api.noroff.dev/holidaze/profiles/";

function GetProfile(id, token, key, image, setImage, setUserVenues,setUserBookings, setName){

    const [profile, setProfile] = useState();
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        async function getData() {
            try{
                setIsLoading(true);
                const requestOptions = {
                    method: 'GET',
                    headers: { 
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                        "X-Noroff-API-Key": key
                    },
                };
                const response = await fetch(profileUrl+id+"?_bookings=true&_venues=true",requestOptions);
                const json = await response.json();
                
                if(response.ok){
                    setProfile(json.data);
                    setImage(json.data.avatar.url);
                    setUserBookings(json.data.bookings);
                    setUserVenues(json.data.venues);
                    setName(json.data.name);
                }
                else{
                    alert(json.errors[0].message);
                }
                setIsLoading(false);
            }
            catch (error){
                setIsLoading(false);
            }
        }
        getData();
    },[id, token, key, image, setImage, setUserVenues, setUserBookings, setName]);

    if (isLoading) {
        return <Spinner animation="border" role="status"></Spinner>;
    } else if(profile===undefined||profile===null){
        return (
            <Container className="mt-5 pt-5" > 
                <p>Profile info not found</p>
            </Container>
            );
    } else{
        return (
            <Container className="mt-5 pt-5" > 
                <Row className="text-dark bg-light border rounded mx-1 px-1"> 
                    <Col md={4}>
                        <div className="ratio ratio-1x1">
                            <Image className="p-2" src={image} alt={profile.avatar.alt} fluid roundedCircle ></Image>
                        </div>
                    </Col>
                    <Col md={8}>
                        <Row className="ml-1 mt-3"><h2>{profile.name}</h2></Row>
                        <Row className="ml-1 "> <p>{profile.bio} </p></Row>
                        <Row className="mt-5 ml-1 "> <p>Contact: <a href={`mailto:${profile.email}`}>{profile.email}</a></p></Row>
                    </Col>
                </Row>
                
            </Container>
            
        );
    }
}

function GetVenues(venues, name, username,venueManager, DeleteVenue){
    let accordionBodyItems = "";
    if(typeof venues === 'undefined'|| venues.length<=0){
        accordionBodyItems = (
            <Accordion.Body>
                No Venues found
            </Accordion.Body>
        );
    }else{
        accordionBodyItems = venues.map((venue)=>(   
            <Accordion.Body key= {venue.id}>
                <Row className="border rounded">
                    <Col md={4}>
                        {venue.media.length>0? <Card.Img className="m-2" variant='top' src={venue.media[0].url} /> : <Card.Img variant='top' src="https://saterdesign.com/cdn/shop/products/property-placeholder_a9ec7710-1f1e-4654-9893-28c34e3b6399_2000x.jpg?v=1500393334" />}
                    </Col>
                    <Col>
                        <h3 className="mt-3">{venue.name}</h3>
                        <p>Price: {venue.price}$ | Max. guests:{venue.maxGuests} </p>
                        {name===username&&venueManager?<Link className="btn btn-dark mt-1 mb-1" to={`/venue/${venue.id}`}>View Bookings</Link> : <Link className="btn btn-dark mt-1 mb-1" to={`/venue/${venue.id}`}>View</Link>}
                        {name===username&&venueManager?<Link className="btn btn-dark mt-1 mb-1 mx-1" to={`/addeditvenue/${venue.id}`}>Edit</Link>:""}
                        {name===username&&venueManager?<Link className="btn btn-danger mt-1 mb-1" id={venue.id} onClick={DeleteVenue}>Delete</Link>:""}
                    </Col>
                </Row>
            </Accordion.Body>
        ));
    }
    return (
            <Accordion className="mb-5" data-bs-theme="light" alwaysOpen >
                <Accordion.Item eventKey="0">
                    <Accordion.Header>{name===username?"Your":name} Venues </Accordion.Header>
                    
                        {accordionBodyItems}
                    
                </Accordion.Item>
            </Accordion>
    );
}

function GetBookings(bookings, DeleteBooking){
    let accordionBodyItems = "";
    if(typeof bookings === 'undefined'|| bookings.length<=0){
        accordionBodyItems = (
            <Accordion.Body>
                No Bookings found
            </Accordion.Body>
        );
    }else{
        accordionBodyItems = bookings.map((booking)=>(
            <Accordion.Body key={booking.id}>
                <Row className="border rounded">
                    <Col md={4}>
                        {booking.venue.media.length>0? <Card.Img className="m-2" variant='top' src={booking.venue.media[0].url} /> : <Card.Img variant='top' src="https://saterdesign.com/cdn/shop/products/property-placeholder_a9ec7710-1f1e-4654-9893-28c34e3b6399_2000x.jpg?v=1500393334" />}
                    </Col>
                    <Col>
                        <h3 className="mt-3">{booking.venue.name}</h3>
                        <p>From: {new Date(booking.dateFrom).toLocaleDateString()} To: {new Date(booking.dateTo).toLocaleDateString()}</p>
                        <Link className="btn btn-dark mt-1 mb-1 mx-1" to={`/venue/${booking.venue.id}`}>View</Link> 
                        <Link className="btn btn-danger mt-1 mb-1" id={booking.id} onClick={DeleteBooking}>Delete</Link>
                    </Col>
                </Row>
            </Accordion.Body>
        ));
    }
    return (
        <Accordion className="mt-1" data-bs-theme="light" alwaysOpen>
            <Accordion.Item eventKey="0">
                <Accordion.Header>Your Bookings</Accordion.Header>
                {accordionBodyItems}
            </Accordion.Item>
        </Accordion>
    );
}

function GetChangeAvatar(UpdateAvatar){
    return (
        <Accordion className="mt-1" data-bs-theme="light" alwaysOpen>
            <Accordion.Item eventKey="0">
                <Accordion.Header>Change your avatar:</Accordion.Header>
                <Accordion.Body>
                    <form onSubmit={UpdateAvatar} className="need-validation ">
                    <Stack direction="horizontal" gap={1}>
                        <label htmlFor="avatar">Image URL:</label>
                        <input type="url" className="form-control" autoComplete="on" required id="avatar" aria-label="avatar"/>                        
                        <button type="submit" id="SubmitButton" className="btn btn-dark">Update</button>
                    </Stack>
                    </form>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}

async function AvatarUpdate(event, token, key, id,setImage ){
    event.preventDefault();
    const avatar = event.target[0].value;
    const requestOptions = {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            "X-Noroff-API-Key": key
        },
        body: JSON.stringify({
            avatar: {
                url: avatar,
                alt: "profile avatar image"
            }
        })
    };
    const response = await fetch(profileUrl+id,requestOptions);
    const json = await response.json();
    
    if(response.ok){
        setImage(event.target[0].value);
        event.target[0].value = "";
    }
    else{
        alert(json.errors[0].message);
    }
}

async function VenueDelete(venueId, token, key, id, setUserVenues ){
    
    const requestOptions = {
        method: 'DELETE',
        headers: { 
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            "X-Noroff-API-Key": key
        }
    };
    const response = await fetch(venueUrl+venueId,requestOptions);
    if(response.ok){
        const requestOptions1 = {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
                "X-Noroff-API-Key": key
            },
        };
        const response1 = await fetch(profileUrl+id+"?_venues=true",requestOptions1);
        const json1 = await response1.json();
        
        if(response1.ok){
            setUserVenues(json1.data.venues);
        }
        else{
            alert(json1.errors[0].message);
        }
    }
    else{
        const json = response.json();
        alert(json.errors[0].message);
    }
}

async function BookingDelete(bookingId, token, key, id, setUserBookings ){
    
    const requestOptions = {
        method: 'DELETE',
        headers: { 
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            "X-Noroff-API-Key": key
        }
    };
    const response = await fetch(bookingUrl+bookingId,requestOptions);
    if(response.ok){
        const requestOptions1 = {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
                "X-Noroff-API-Key": key
            },
        };
        const response1 = await fetch(profileUrl+id+"?_bookings=true",requestOptions1);
        const json1 = await response1.json();
        
        if(response1.ok){
            setUserBookings(json1.data.bookings);
        }
        else{
            alert(json1.errors[0].message);
        }
    }
    else{
        const json = response.json();
        alert(json.errors[0].message);
    }
}
 
function Profile(){
    const [image, setImage] = useState("https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif");
    const [userVenues, setUserVenues] = useState();
    const [userBookings, setUserBookings] = useState();
    let params = useParams();
    const token = userDetails((state) => state.accessToken);
    const key = userDetails((state) => state.apiKey);
    const [name, setName] = useState();
    const username = userDetails((state) => state.name);
    const loggedIn = userDetails((state) => state.loggedIn);
    const venueManager = userDetails((state) => state.venueManager);
    const UpdateAvatar = async (event) => {
        AvatarUpdate(event, token, key, params.id, setImage );
    }
    const DeleteVenue = async (event) => {
        VenueDelete(event.target.id, token, key, params.id, setUserVenues );
    }
    const DeleteBooking = async (event) => {
        BookingDelete(event.target.id, token, key, params.id, setUserBookings);
    }
    let profile = <p className="pt-5 mt-5">Please log in to view this content</p>;
    let bookings = "";
    let venues = "";
    let changeAvatar = "";
    
    if(loggedIn){
        profile = GetProfile(params.id, token, key, image, setImage, setUserVenues, setUserBookings, setName);
        if(name===username){bookings = GetBookings(userBookings, DeleteBooking);}
        if(name!==username||venueManager){venues = GetVenues(userVenues, name, username,venueManager, DeleteVenue);}
    }
    if(params.id===username){
        changeAvatar = GetChangeAvatar(UpdateAvatar);
    }

    return (
        <main>
            <Container>
                <Row className="justify-content-center pt-3">
                    {profile} 
                </Row>
                <Row className="">
                    {changeAvatar}
                </Row>
                <Row className="mt-5">
                    {bookings}
                    <Container className="mt-2">
                        {venueManager&&name===username?<Link className="btn btn-dark my-2 mx-1 float-end" to={`/addeditvenue/new`}>Create New Venue</Link>:""}
                        {venues}
                    </Container>
                </Row>
            </Container>
            
        </main>
    );
};
 
export default Profile;