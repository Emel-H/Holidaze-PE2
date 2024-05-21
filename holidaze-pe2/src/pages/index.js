import React from 'react';
import {Link} from 'react-router-dom';
import {Container, Row, Col } from 'react-bootstrap';
import banner from "../images/homepage2.jpg";

function Home() {

    
    return (
        <main>
            <Container fluid className='pt-5 my-3'>
                <Row className="mx-5 mt-5 position-relative">
                    <img className="w-100" src={banner} alt="banner for the home page"/>
                    <Link className='position-absolute bottom-0 end-0 translate-middle btn btn-info w-25' to="/venues">Book</Link>
                </Row>
                <Row className="mx-5 mt-5">
                    <Col md={6} className=" bg-dark">
                        <h1 className="mt-5 px-5 text-white">Need help to book and manage </h1>
                        <Link className="float-center my-3 btn btn-outline-info text-white" to="/guide">Go to Guide</Link>
                    </Col>
                    <Col md={6} className="bg-info">
                        <img className="w-100 overflow-hidden" src="" alt=""/>
                    </Col>
                </Row>
                <Row className="mx-5">
                    <Col md={6} className=" bg-info">
                        <img className="w-100 overflow-hidden" src="" alt=""/>    
                    </Col>
                    <Col md={6} className="bg-dark">
                        <h1 className="mt-5 px-5 text-white"> Join the Holidaze community</h1>
                        <Link className="float-center my-3 btn btn-outline-info text-white" to="/Register">Register Here</Link>    
                    </Col>
                </Row> 
            </Container>
        </main>
        
    );
};
 
export default Home;