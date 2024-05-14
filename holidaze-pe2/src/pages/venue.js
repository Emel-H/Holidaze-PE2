import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import { Container, Row, Col, Spinner } from 'react-bootstrap';


 
const producturl = "https://v2.api.noroff.dev/online-shop/";

function GetProduct(id){
    let [product, setProduct] = useState([]);
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
                const response = await fetch(producturl+id);
                const json = await response.json();
                // Setting our `product` state to the API data we received
                setProduct(json.data);
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
        let reviews = (
            <Row className="justify-content-center mt-2 mx-5 border bg-white">
                <p>No reviews available</p>
            </Row>
            );
        if(product.reviews.length>1){
            reviews = product.reviews.map((review) => ( 
                    <Row key={review.id} className="justify-content-center mt-2 mx-5 border bg-white">
                        <Col md={4}>
                            <Row><h3>{review.username}</h3></Row>
                            <Row><h4>Rating: {review.rating}</h4></Row>
                        </Col>
                        <Col md={5}>
                            <Row>
                                <h4>Description:</h4>
                                <p>{review.description}</p>
                            </Row>
                        </Col>
                    </Row>
             ));
        }
        return (
            <Container className=""> 
                <Row className="mx-5 border bg-white">
                    <Col md={4}>
                        <img src={product.image.url} alt={product.image.alt} width="100%"></img>
                    </Col>
                    <Col md={5}>
                        <Row className="ml-1"><h2>{product.title}</h2></Row>
                        <Row className="ml-1"> <p>{product.description} </p></Row>
                        <Row className="mb-5 ml-1"> <h3>Rating: {product.rating}</h3></Row>
                        <Row className="ml-1"> <h4>Price: {product.price===product.discountedPrice ? product.discountedPrice+"$" : product.discountedPrice+"$ discounted:"+ (Math.round((product.discountedPrice-product.price))) +"$ "}</h4> </Row>
                    </Col>
                </Row>
                <Row className="justify-content-center mt-5">
                    <h2>User Reviews</h2>
                </Row>
                {reviews}
                
            </Container>
        );
    }
}

 
function Venue(){
    let params = useParams()
    const product = GetProduct(params.id);


    return (
        <main>
            <Container>
                <Row className="justify-content-center">
                    {product}
                </Row>
            </Container>
            
        </main>
    );
};
 
export default Venue;