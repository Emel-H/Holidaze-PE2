import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import { Container, Row, Col, Spinner, Accordion, Card, Image } from 'react-bootstrap';
import { userDetails } from '../util/userdetails';

 
const profileUrl = "https://v2.api.noroff.dev/holidaze/profiles/";

function GetProfile(id, token, key, image, setImage, setUserVenues,setUserBookings, setName){

    const [profile, setProfile] = useState([]);
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
    },[id, token, key, image, setImage]);

    if (isLoading) {
        return <Spinner animation="border" role="status"></Spinner>;
    }
    else{
        return (
            <Container className="mt-5 pt-5" > 
                <Row className="text-dark bg-light border rounded mx-1 px-1"> 
                    <Col md={4}>
                        <Image className="p-2" src={image} alt={profile.avatar.alt} fluid roundedCircle ></Image>
                    </Col>
                    <Col md={8}>
                        <Row className="ml-1 "><h2>{profile.name}</h2></Row>
                        <Row className="ml-1 "> <p>{profile.bio} </p></Row>
                        <Row className="mt-5 ml-1 "> <p>Contact: <a href={`mailto:${profile.email}`}>{profile.email}</a></p></Row>
                    </Col>
                </Row>
                
            </Container>
            
        );
    }
}

function GetVenues(venues, name){
    let accordionBodyItems = "";
    if(typeof venues === 'undefined'|| venues.length<=0){
        accordionBodyItems = (
            <Accordion.Body>
                No Venues found
            </Accordion.Body>
        );
    }else{
        accordionBodyItems = venues.map((venue)=>(
            <Accordion.Body>
                <Card>{venue.name} at {venue.location.city}  with max {venue.maxGuests} guests <Link className="btn btn-dark" to={`/venue/${venue.id}`}>View</Link></Card>
            </Accordion.Body>
        ));
    }
    return (
        <Accordion.Item eventKey="1">
            <Accordion.Header>{name} Venues</Accordion.Header>
            {accordionBodyItems}
        </Accordion.Item>
    );
}

function GetBookings(bookings, name){
    let accordionBodyItems = "";
    if(typeof bookings === 'undefined'|| bookings.length<=0){
        accordionBodyItems = (
            <Accordion.Body>
                No Bookings found
            </Accordion.Body>
        );
    }else{
        accordionBodyItems = bookings.map((booking)=>(
            <Accordion.Body>
                <Card>
                    {booking.venue.name} with {booking.guests} guests dates: {new Date(booking.dateFrom).toLocaleDateString()} - {new Date(booking.dateTo).toLocaleDateString()} 
                    <Link className="btn btn-dark" to={`/booking/${booking.id}`}>View</Link>
                </Card>
            </Accordion.Body>
        ));
    }
    return (
        <Accordion.Item eventKey="0">
            <Accordion.Header>{name} Bookings</Accordion.Header>
            {accordionBodyItems}
        </Accordion.Item>
    );
}

function GetChangeAvatar(UpdateAvatar){
    return (
        <Accordion className="mt-1" data-bs-theme="light" alwaysOpen>
            <Accordion.Item eventKey="0">
                <Accordion.Header>Change your avatar:</Accordion.Header>
                <Accordion.Body>
                    <form onSubmit={UpdateAvatar} className="need-validation ">
                    <label htmlFor="avatar">Enter image URL:</label>
                    <input type="url" className="form-control" required id="avatar" aria-label="avatar"/>                        
                    <button type="submit" id="SubmitButton" className="btn btn-dark m-3">Update</button>
                    </form>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}

async function AvatarUpdate(event, token, key, params,setImage ){
    event.preventDefault();
    const avatar = event.target[0].value;
    console.log(avatar);
    console.log(token);
    console.log(key);
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
    const response = await fetch(profileUrl+params.id,requestOptions);
    const json = await response.json();
    
    if(response.ok){
        setImage(event.target[0].value);
        event.target[0].value = "";
    }
    else{
        alert(json.errors[0].message);
    }
}
 
function Profile(){
    const [image, setImage] = useState("https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif");
    const [userVenues, setUserVenues] = useState();
    const [userBookings, setUserBookings] = useState();
    let params = useParams()
    const token = userDetails((state) => state.accessToken);
    const key = userDetails((state) => state.apiKey);
    const [name, setName] = useState();
    const username = userDetails((state) => state.name);
    const loggedIn = userDetails((state) => state.loggedIn);
    const UpdateAvatar = async (event) => {
        AvatarUpdate(event, token, key, params,setImage );
    }
    let profile = <p className="pt-5 mt-5">Please log in to view this content</p>;
    let bookings = "";
    let venues = "";
    let changeAvatar = "";
    
    if(loggedIn){
        profile = GetProfile(params.id, token, key, image, setImage, setUserVenues, setUserBookings, setName);
        bookings = GetBookings(userBookings, name);
        venues = GetVenues(userVenues, name);
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
                    <Accordion defaultActiveKey={['0']} data-bs-theme="light" alwaysOpen>
                        {bookings}
                        {venues}
                    </Accordion> 
                </Row>
            </Container>
            
        </main>
    );
};
 
export default Profile;