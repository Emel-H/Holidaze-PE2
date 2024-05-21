import React from 'react';
import { useNavigate } from 'react-router-dom';
 
const registerUrl = "https://v2.api.noroff.dev/auth/register";

function Home() {
    const navigate = useNavigate();
    const RegisterUser = async (event) => {
        event.preventDefault();
        const name = event.target[0].value;
        const email = event.target[1].value;
        const password = event.target[2].value;
        const avatar = event.target[3].value;
        const bio = event.target[4].value;
        const venueManager = event.target[5].checked;
        
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                name: name,
                email: email,
                bio: bio,
                avatar: {
                    url: avatar,
                    alt: "profile avatar image"
                },
                venueManager: venueManager,
                password: password
            })
        };
        const response = await fetch(registerUrl,requestOptions);
        const json = await response.json();
        if(response.ok){
            alert("Registration successful, please login to proceed");
            navigate("../login");
        }
        else{
            alert(json.errors[0].message);
        }

    }
    
    return (
        <main>
            <div className="container">
                <div className="row my-5">
                <div className="col"></div>
                <div className="col-sm-6">
                    <h1 className="text-center mt-5">Register at Holidaze</h1>
                    <p className="text-center mt-1 mb-4" id="userFeedback">Enter registration info below</p>
                    <form onSubmit={RegisterUser} className="need-validation border border-dark rounded">
                        <div className="form-group my-4 mx-3">
                            <label htmlFor="username">Username</label>
                            <input type="text" className="form-control" required id="username" aria-label="username"/>
                        </div>
                        <div className="form-group my-4 mx-3">
                            <label htmlFor="InputEmail">Email Address (User Name)</label>
                            <input type="email" className="form-control" required id="InputEmail" aria-describedby="email" pattern="^[A-Za-z0-9._%+\-]+(@stud\.noroff)\.no$"/>
                            <small id="email" className="form-text text-muted">You must use @stud.noroff.no email domains to register</small>
                        </div>
                        <div className="form-group my-4 mx-3">
                            <label htmlFor="InputPassword">Password</label>
                            <input type="password" className="form-control" minlength="8" required id="InputPassword"/>
                            <small id="password" className="form-text text-muted">For Safety, password must be a minimum of 8 characters in length</small>
                        </div>
                        <div className="form-group my-4 mx-3">
                            <label htmlFor="avatar">Avatar</label>
                            <input type="url" className="form-control" required id="avatar"/>
                            <small id="avatartext" className="form-text text-muted">To add an avatar image to your profile, please include the image URL</small>
                        </div>
                        <div className="form-group my-4 mx-3">
                            <label htmlFor="bio">Biography</label>
                            <input type="textbox" className="form-control" required minLength="2" id="bio"/>
                            <small id="biotext" className="form-text text-muted">Add a few words about yourself</small>
                        </div>
                        <div className="form-group my-4 mx-3">
                            <input type="checkbox" className="mx-2" id="venuemanager"/>
                            <label htmlFor="venuemanager">I would like to be a Venue Manager</label>
                        </div>

                        <button type="submit" id="SubmitButton" className="btn btn-dark mb-3">Register</button>
                    </form>
                </div>
                <div className="col"></div>
                </div>
            </div>
        </main>
        
    );
};
 
export default Home;