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
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <div className="App bg-white">
        <Routes userRole={"Admin"}>
          <Route path="/" element={<Layout />}>
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/register" element={<Register />} />
            <Route path="/venues" element={<Venues />} />
            <Route path="/venue/:id" element={<Venue />} />
          </Route>
        </Routes>
        <script src="https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js" ></script>
        <script src="https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js" ></script>
        <script src="https://cdn.jsdelivr.net/npm/react-bootstrap@next/dist/react-bootstrap.min.js" ></script>
      </div>
    </BrowserRouter>
  );
}

export default App;
