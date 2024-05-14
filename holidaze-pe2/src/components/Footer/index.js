import React from "react";
import Button from 'react-bootstrap/Button';

function Footer() {
    return (
      <footer className="bg-dark text-info">
        <p className="mt-2">Follow us:</p>
        <p>
            <Button className="mx-1" variant="light"><a href="https://www.facebook.com" >FB</a></Button>
            <Button className="mx-1" variant="light"><a href="https://www.twitter.com" >TW</a></Button>
            <Button className="mx-1" variant="light"><a href="https://www.instagram.com" >IG</a></Button>
        </p>
        <p>&copy;2024 Holidaze Ltd</p>
      </footer>
    );
  }
  
  export default Footer;