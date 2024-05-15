import React from "react";

function Footer() {
    return (
      <footer className="bg-light text-info">
        <p className="mt-2">Follow us:</p>
        <p>
            <a className="btn btn-dark mx-1" href="https://www.facebook.com" ><i className="bi bi-facebook text-white"></i></a>
            <a className="btn btn-dark mx-1" href="https://www.twitter.com" ><i className="bi bi-twitter text-white"></i></a>
            <a className="btn btn-dark mx-1" href="https://www.instagram.com" ><i className="bi bi-instagram text-white"></i></a>
        </p>
        <p>&copy;2024 Holidaze Ltd</p>
      </footer>
    );
  }
  
  export default Footer;