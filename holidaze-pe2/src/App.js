import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/index";
import Profile from "./pages/profile";
import Login from "./pages/login";
import Register from "./pages/register";
import Venues from "./pages/venues";
import Venue from "./pages/venue";
import AddEditVenue from "./pages/addeditvenue";
import Guide from "./pages/guide";
import "./App.css";
import "./custom.scss";
//import "bootstrap/dist/css/bootstrap.min.css";

/**
 * a function that decides the layout of the html pages in the react app
 * @returns html code
 */
function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

/**
 * the main react app code is generated in this function
 * @returns html code
 */
function App() {
  return (
    <BrowserRouter>
      <div className="App bg-light">
        <Routes userRole={"Admin"}>
          <Route path="/" element={<Layout />}>
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/register" element={<Register />} />
            <Route path="/venues" element={<Venues />} />
            <Route path="/venue/:id" element={<Venue />} />
            <Route path="/addeditvenue/:id" element={<AddEditVenue />} />
            <Route path="/guide" element={<Guide />} />
          </Route>
        </Routes>
        <script src="https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/react-bootstrap@next/dist/react-bootstrap.min.js"></script>
      </div>
    </BrowserRouter>
  );
}

export default App;
