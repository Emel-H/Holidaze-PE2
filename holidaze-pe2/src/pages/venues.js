import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {Card, Container, Row, Spinner } from 'react-bootstrap';
 
const url = "https://v2.api.noroff.dev/holidaze/venues?page=";
const searchUrl = "https://v2.api.noroff.dev/holidaze/venues/search?page=";

function GetVenues(search){
    
    let [venues, setVenues] = useState([]);
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
                let allVenues=[];
                while(morePages){
                    let response;
                    if(search.toString()==""){
                        response = await fetch(url+page.toString());
                    }
                    else{
                        response = await fetch(searchUrl+page.toString()+"&q="+search);
                    }
                    const json = await response.json();
                    allVenues.push(...json.data);
                    if(json.meta.pageCount>page){
                        page++;
                    }
                    else{
                        morePages=false;
                    }
                }
                
                // Setting our `products` state to the API data we received
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
        return <Spinner animation="border" role="status"></Spinner>;
    }
    else if (isError){
        return <h2>Error loading data from our servers</h2>;
    }
    else{
        
        if(venues.length >1){
            return PopulateVenues(venues);
        }
        else{
            return <h2> No match to your search, try something else </h2>;
        }
        
    }
    
}

function PopulateVenues(venues){
    return venues.map((venue) => ( 
        <Card className="m-3" style={{ width: '18rem' }}>
            {venue.media.length>1? <Card.Img variant='top' src={venue.media[0].url} /> : ""}
            <Card.Body>
                <Card.Title>{venue.name}</Card.Title>
                <Card.Text>{venue.location.city}, {venue.location.country} </Card.Text>
                <Card.Text> Max guests: {venue.maxGuests} </Card.Text>
                <Card.Text> Price: {venue.price} $ </Card.Text>
                <Link className="btn btn-info" to={`/venue/${venue.id}`}>View</Link>
            </Card.Body>
        </Card>
 ));
}

function Venues() {

    const [searchValue, setSearchValue] = useState("");
    
    const OnSearch = (event) => {
        event.preventDefault();
        setSearchValue(event.target[0].value);
    }

    const venues = GetVenues(searchValue); 
    
    return (
        <main>
            <h1 className="text-info pt-5 mt-5"> Holidaze Venue Catalog</h1>
            <h2 className="text-center mt-1 mb-4">Your primary destination for great deals</h2>
            <Container>
                <Row >
                    <form  onSubmit={OnSearch}>
                        <input type="text" style={{width:'18rem'}}/>
                        <div type="submit" className="btn btn-dark mb-4 mx-3">Search</div>
                    </form>
                </Row>
                <Row className="justify-content-center">
                    {venues}
                </Row>
            </Container>
        </main>
        
    );
};
 
export default Venues;