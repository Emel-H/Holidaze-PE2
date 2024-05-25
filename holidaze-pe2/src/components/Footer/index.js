import React from "react";

/**
 * function that generates the footer component of the website
 * @returns html code of footer
 */
function Footer() {
  return (
    <footer className="bg-white text-dark border-top border-bottom mt-5 py-3">
      <p className="">Follow us:</p>
      <p>
        <a
          aria-label="go to facebook"
          className="btn btn-dark mx-1"
          href="https://www.facebook.com"
        >
          <i className="bi bi-facebook text-white"></i>
        </a>
        <a
          aria-label="go to twitter"
          className="btn btn-dark mx-1"
          href="https://www.twitter.com"
        >
          <i className="bi bi-twitter text-white"></i>
        </a>
        <a
          aria-label="go to instagram"
          className="btn btn-dark mx-1"
          href="https://www.instagram.com"
        >
          <i className="bi bi-instagram text-white"></i>
        </a>
      </p>
      <p>&copy;2024 Holidaze Ltd</p>
    </footer>
  );
}

export default Footer;
