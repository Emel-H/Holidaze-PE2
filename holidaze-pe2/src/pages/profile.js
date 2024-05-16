import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { userDetails } from '../util/userdetails';

 
const profileUrl = "https://v2.api.noroff.dev/holidaze/profiles/";

function GetProfile(id, token, key, image, setImage){

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
                const response = await fetch(profileUrl+id,requestOptions);
                const json = await response.json();
                
                if(response.ok){
                    setProfile(json.data);
                    setImage(json.data.avatar.url);
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
            <Container className="mt-5 pt-5"> 
                <Row className="mx-5 border border-dark bg-light">
                    <Col md={4}>
                        <img src={image} alt={profile.avatar.alt} width="100%"></img>
                    </Col>
                    <Col className="justify-content-start" md={5}>
                        <Row className="ml-1"><h2>{profile.name}</h2></Row>
                        <Row className="ml-1"> <p>{profile.bio} </p></Row>
                        <Row className="mt-5 ml-1"> <p>Contact: <a href={`mailto:${profile.email}`}>{profile.email}</a></p></Row>
                    </Col>
                </Row>
            </Container>
        );
    }
}
 
function Profile(){
    const [image, setImage] = useState(
        "https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif"
    );
    let params = useParams()
    const token = userDetails((state) => state.accessToken);
    const key = userDetails((state) => state.apiKey);
    const name = userDetails((state) => state.name);
    const loggedIn = userDetails((state) => state.loggedIn);

    let profile ="Please login to view this content";
    
    if(loggedIn){profile=GetProfile(params.id, token, key, image, setImage);}

    const UpdateAvatar = async (event) => {
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

    return (
        <main>
            <Container>
                <Row className="justify-content-center mt-5 pt-4">
                    {profile} 
                </Row>
                {params.id==name?<Row className="mx-5">
                    <form onSubmit={UpdateAvatar} className="need-validation border border-dark bg-light  pt-3">
                        <label htmlFor="avatar">Change your avatar:</label>
                        <input type="url" className="form-control" required id="avatar" aria-label="avatar"/>                        
                        <button type="submit" id="SubmitButton" className="btn btn-dark m-3">Update</button>
                    </form>
                </Row>:""}
            </Container>
            
        </main>
    );
};
 
export default Profile;