import React from "react";

function Footer() {
    return (
      <footer className="bg-white text-dark border-top border-bottom mt-5 py-3">
        <p className="">Follow us:</p>
        <p>
            <a className="btn btn-dark mx-1" href="https://www.facebook.com" ><i className="bi bi-facebook text-info"></i></a>
            <a className="btn btn-dark mx-1" href="https://www.twitter.com" ><i className="bi bi-twitter text-info"></i></a>
            <a className="btn btn-dark mx-1" href="https://www.instagram.com" ><i className="bi bi-instagram text-info"></i></a>
        </p>
        <p>&copy;2024 Holidaze Ltd</p>
      </footer>
    );
  }
  
  export default Footer;