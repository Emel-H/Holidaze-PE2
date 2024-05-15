import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {Form, Card, Container, Row, Spinner } from 'react-bootstrap';
 
const url = "https://v2.api.noroff.dev/holidaze/venues?page=";

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
                    const response = await fetch(url+page.toString());
                    const json = await response.json();
                    allVenues.push(...json.data);
                    if(json.meta.pageCount>page){
                        page++;
                    }
                    else{
                        morePages=false;
                    }
                }
                
                // Setting our `venues` state to the API data we received
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
        return PopulateVenues(venues, search); 
    }
    
}

function PopulateVenues(venues, search){
    const pop = (venues.filter((venue) => venue.name.toLowerCase().includes(search.toLowerCase())||venue.description.toLowerCase().includes(search.toLowerCase())));
    if(pop.length>1){
        return pop.map((venue) => ( 
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
    else{
        return <h3 className="my-3"> No match to your search, try something else. </h3>;  
    }  
}

function Venues() {

    const [searchValue, setSearchValue] = useState("");
    
    function OnSearchChange (event) {
        setSearchValue(event.target.value); 
    }

    const venues = GetVenues(searchValue); 
    
    return (
        <main>
            <h1 className="text-info pt-5 mt-5"> Holidaze Venue Catalog</h1>
            <h2 className="text-center mt-1 mb-4">Your primary destination for great deals</h2>
            <Container>
                <Row >
                    <Form.Control className="my-4" type="text" onChange={OnSearchChange} placeholder="Search"/>
                </Row>
                <Row className="justify-content-center">
                    {venues}
                </Row>
            </Container>
        </main>
        
    );
};
 
export default Venues;