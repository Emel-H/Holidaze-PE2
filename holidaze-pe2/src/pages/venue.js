import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import { Container, Row, Col, Carousel, ListGroup, ListGroupItem, Stack} from 'react-bootstrap';
import { userDetails } from '../util/userdetails';

const venueUrl = "https://v2.api.noroff.dev/holidaze/venues/";

function GetVenueInfo(id, setImages, setOwnerName, setUserBookings, setVenueInfo){
   
    // The useEffect will run once when the component first mounts
    useEffect(() => {
        async function getData() {
            
            const response = await fetch(venueUrl+id+"?_owner=true&_bookings=true");
            const json = await response.json();
            
            if(response.ok){
                setVenueInfo(json.data);
                setImages(json.data.media);
                setOwnerName(json.data.owner.name);
                setUserBookings(json.data.bookings);
            }
            else{
                alert(json.errors[0].message);
            }
            
        }
        getData();
    }, [id, setImages, setOwnerName, setUserBookings, setVenueInfo]);
}

async function BookingCreate(event, token, key, venueId){

}

function GetCarosel(images){
    if(images.length>0){
        return images.map((image) => (
            <Carousel.Item>
                <img style={{maxHeight:"380px"}} className="w-100" src={image.url} alt={image.alt} />
            </Carousel.Item>
        ));
    }
}

function GetVenue(venueInfo){
    if(venueInfo===""){
        return "";
    }
    else{
        return (
            <Row className="mt-3 mx-1 ">
                <Col md={5} lg={6}>
                    <Row> <p>Managed by: <Link className="" to={`/profile/${venueInfo.owner.name}`}>{venueInfo.owner.name}</Link></p></Row>
                    <Row> <p>Contact: <a href={`mailto:${venueInfo.owner.email}`}>{venueInfo.owner.email} </a></p></Row>
                    <Row> <p>Rating: {venueInfo.rating}</p></Row>
                    <Row> <p>Price: {venueInfo.price} $</p> </Row>
                </Col>
                <Col md={7} lg={6}>
                    <Row> <p>Description:</p><p>{venueInfo.description.substring(0,400)} </p></Row>
                    <Row> <p>Amminites: {venueInfo.meta.pets?"Pets | ":""} {venueInfo.meta.parking?"Parking | ":""} {venueInfo.meta.wifi?"Wifi | ":""} {venueInfo.meta.breakfast?"Breakfast ":""}</p></Row>
                </Col>
            </Row>
        );
    }
    
}

function GetBooking(userBookings, loggedIn, CreateBooking){
    if (loggedIn){
        return (
            "book this venue"
        );
    }
    else{
        return (<p className="text-center">Please log in to book this venue</p>);
    }
}

function GetVenueBookings(userBookings){
    if(userBookings.length>0){
        const bookings = userBookings.map((booking) => (
            <ListGroupItem>
                    <div className="float-start"><p><Link  to={`/profile/${booking.customer.name}`}>{booking.customer.name}</Link></p></div>
                    <div className="float-end"><p>From: {new Date(booking.dateFrom).toLocaleDateString()} To: {new Date(booking.dateTo).toLocaleDateString()}</p></div>
            </ListGroupItem>
        ));
        return (
            <ListGroup>
                <h2 className="text-center">Bookings to your venue</h2>
                {bookings}
            </ListGroup>
        );
    }
    else{
        return (
            <Container className="text-center">            
                <h2 >Bookings to your venue</h2>
                <p className="pt-2">Currently no bookings to this venue</p>
            </Container>
        );

    }
    
}


function Venue(){
    const params = useParams();

    const [images, setImages] = useState(["https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif"]);
    const [ownerName, setOwnerName] = useState("");
    const [userBookings, setUserBookings] = useState("");
    const [venueInfo, setVenueInfo] = useState("");
    GetVenueInfo(params.id, setImages, setOwnerName, setUserBookings, setVenueInfo);
    
    const token = userDetails((state) => state.accessToken);
    const key = userDetails((state) => state.apiKey);
    const username = userDetails((state) => state.name);
    const loggedIn = userDetails((state) => state.loggedIn);
    const venueManager = userDetails((state) => state.venueManager);

    const CreateBooking = async (event) => {
        BookingCreate(event, token, key, params.id);
    }

    const carosel = GetCarosel(images);
    const venueInformation = GetVenue(venueInfo);
    const bookingVenue = GetBooking(userBookings, loggedIn, CreateBooking);
    const myVenueBookings = GetVenueBookings(userBookings);

    

    return (
        <main>
            <Container className="text-start px-5">
                <h1 className="pt-5 mt-5">{venueInfo.name}</h1>
                <Row className="justify-content-center">
                    <Carousel className="text-center" data-bs-theme="dark">
                        {carosel}
                    </Carousel>
                </Row>
                {venueInformation}
                
                    {ownerName===username&&venueManager?<Row className="border-top py-4"> {myVenueBookings}</Row> : <Row>{bookingVenue}</Row>}
                
            </Container>
            
        </main>
    );
};
 
export default Venue;