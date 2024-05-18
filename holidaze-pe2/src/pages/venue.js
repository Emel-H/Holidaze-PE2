import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import { Container, Row, Col, Spinner } from 'react-bootstrap';

const venueUrl = "https://v2.api.noroff.dev/holidaze/venues/";

function GetVenue(id){
    let [venue, setVenue] = useState([]);
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
                const response = await fetch(venueUrl+id+"?_owner=true");
                const json = await response.json();
                // Setting our `venue` state to the API data we received
                setVenue(json.data);
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
    }, [id]);

    if (isLoading) {
        return <Spinner animation="border" role="status"></Spinner>;
    }
    else if (isError){
        return <h2>Error loading data</h2>;
    }
    else{
        return (
            <Container className="mt-5 pt-5" style={{ flex: 1 }}> 
                <Row className="mx-5 border bg-white">
                    <Col md={4}>
                        <img src={venue.media[0].url} alt={venue.media[0].alt} width="100%"></img>
                    </Col>
                    <Col md={7}>
                        <Row className="ml-1"><h2>{venue.name} by <Link className="" to={`/profile/${venue.owner.name}`}>{venue.owner.name}</Link></h2></Row>
                        <Row className="ml-1"> <p>{venue.description} </p></Row>
                        <Row className="mb-5 ml-1"> <h3>Rating: {venue.rating}</h3></Row>
                        <Row className="ml-1"> <h4>Price: {venue.price}</h4> </Row>
                    </Col>
                </Row>
            </Container>
        );
    }
}

 
function Venue(){
    let params = useParams()
    const venue = GetVenue(params.id);


    return (
        <main>
            <Container>
                <Row className="justify-content-center">
                    {venue}
                </Row>
            </Container>
            
        </main>
    );
};
 
export default Venue;