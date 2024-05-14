import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {Form, Card, Container, Row, Spinner } from 'react-bootstrap';
 
const url = 'https://v2.api.noroff.dev/online-shop';

function GetProducts(search){
    let [products, setProducts] = useState([]);
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
                const response = await fetch(url);
                const json = await response.json();
                // Setting our `products` state to the API data we received
                setProducts(json.data);
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
        return <h2>Error loading data</h2>;
    }
    else{
        
        if(products.length >1){
            const pop = (products.filter((product) => product.title.toLowerCase().includes(search.toLowerCase())||product.description.toLowerCase().includes(search.toLowerCase())));
            return pop.map((product) => ( 
                <Card key={product.id} className="m-3" style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={product.image.url} />
                    <Card.Body>
                        <Card.Title>{product.title}</Card.Title>
                        <Card.Text> {product.description} </Card.Text>
                        <Card.Text> {product.price===product.discountedPrice ? product.discountedPrice+"$" : product.discountedPrice+"$ discounted:"+ (Math.round((product.discountedPrice-product.price))) +"$ "} </Card.Text>
                        <Link className="btn btn-info" to={`/venue/${product.id}`}>View</Link>
                    </Card.Body>
                </Card>
         ));
        }
        else{
            return <h2> No match to your search, try something else </h2>;
        }
        
    }
    
}

function Venues() {

    const [searchValue, setSearchValue] = useState("");
    
    function onSearchChange(event) {
        setSearchValue(event.target.value);
    }

    const products = GetProducts(searchValue); 

    return (
        <main>
            <h1 className="text-info"> eCOM</h1>
            <h2>Your primary destination for great deals</h2>
            <Container>
                <Row>
                    <Form.Control value={searchValue} className="m-5" size="lg" type="text" placeholder="Search" onChange={onSearchChange} />
                </Row>
                <Row className="justify-content-center">
                    {products}
                </Row>
            </Container>
        </main>
        
    );
};
 
export default Venues;