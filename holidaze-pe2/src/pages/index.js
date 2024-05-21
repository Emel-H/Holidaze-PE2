import React from 'react';
import {Link} from 'react-router-dom';
import {Container, Row, Col } from 'react-bootstrap';
import banner from "../images/homepage.jpg";

function Home() {

    
    return (
        <main>
            <Container fluid className='pt-5 my-3'>
                <Row className="mx-md-5 mt-5 position-relative">
                    <img className="" src={banner} alt="banner for the home page"/>
                    
                    <Link className='position-absolute bottom-0 end-0 translate-middle btn btn-primary w-25' to="/guide"> Book Now </Link>
                </Row>
                <Row className="mx-md-5 mt-5">
                    <Col md={6} className=" bg-secondary">
                        <h1 className="mt-5 px-5 text-white">Need help to book and manage venues? </h1>
                        <Link className="float-end my-3 me-3 btn btn-outline-info" to="/guide">Go to Guide</Link>
                    </Col>
                    <Col md={6} className="bg-secondary">
                        <img className="w-100 overflow-hidden" src="" alt=""/>
                    </Col>
                </Row>
                <Row className="mx-md-5">
                    <Col md={6} className=" bg-secondary">
                        <img className="w-100 overflow-hidden" src="" alt=""/>    
                    </Col>
                    <Col md={6} className="bg-secondary">
                        <h1 className="mt-5 px-5 text-white"> New to the HOLIDAZE community?</h1>
                        <Link className="float-end my-3 me-3 btn btn-outline-info" to="/Register">Register Here</Link>    
                    </Col>
                </Row> 
            </Container>
        </main>
        
    );
};
 
export default Home;