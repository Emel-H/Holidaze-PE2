import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { userDetails } from "../util/userdetails";

const loginurl = "https://v2.api.noroff.dev/auth/login?_holidaze=true";

function Login() {
  const addUser = userDetails((state) => state.addUser);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const LoginUser = async (event) => {
    event.preventDefault();
    setError("");
    const email = event.target[0].value;
    const password = event.target[1].value;

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    };
    const response = await fetch(loginurl, requestOptions);
    const json = await response.json();
    if (response.ok) {
      addUser(json.data);
      navigate("../profile/" + json.data.name);
    } else {
      setError(json.errors[0].message);
    }
  };

  return (
    <main>
      <div className="container">
        <div className="row my-5">
          <div className="col-2"></div>
          <div className="col-sm-8">
            <h1 className="text-center mt-5">Welcome to Holidaze</h1>
            <p className="text-center mt-1 mb-4">Enter login details below</p>
            <form onSubmit={LoginUser} className="border border-dark rounded">
              <div className="form-group needs-validation my-4 mx-3">
                <label htmlFor="inputEmail">User Name (Email address)</label>
                <input
                  type="email"
                  className="form-control"
                  required
                  name="InputEmail"
                  id="inputEmail"
                  autoComplete="on"
                  aria-describedby="email"
                  pattern="^[A-Za-z0-9._%+\-]+(@stud\.noroff\.no)$"
                />
                <small id="email" className="form-text text-muted">
                  You must use your @stud.noroff.no email domains
                </small>
              </div>
              <div className="form-group my-4 mx-3">
                <label htmlFor="inputPassword">Password</label>
                <input
                  type="password"
                  className="form-control"
                  minLength="8"
                  required
                  name="InputPassword"
                  id="inputPassword"
                  autoComplete="off"
                />
              </div>
              <p className="text-danger text-center my-3">{error}</p>
              <button type="submit" className="btn btn-dark mb-4 mx-3">
                Sign in
              </button>
            </form>
            <p className="mt-2 mx-2">
              Not a member?{" "}
              <Link className="text-dark" to="/register">
                Register here
              </Link>
            </p>
          </div>
          <div className="col-2"></div>
        </div>
      </div>
    </main>
  );
}

export default Login;
