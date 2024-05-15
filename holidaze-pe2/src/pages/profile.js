import React from 'react';
import { Link } from 'react-router-dom';
import {Container, Row } from 'react-bootstrap';
import { userDetails } from '../util/userdetails';
 


function Home() {

    const username = userDetails((state) => state.name);
    return (
        <main>
            <h1 className="text-info pt-5 mt-5"> Hi, {username}</h1>
            <h2>welcome to your profile page</h2>
            <Container>
                <Row>
                    
                </Row>
                <Row className="justify-content-center">
                
                </Row>
            </Container>
        </main>
        
    );
};
 
export default Home;