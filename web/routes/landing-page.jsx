import React from "react";
import image from "../assets/shelter-image.jpg";
import image2 from "../assets/food-donation.avif";
import { Outlet } from 'react-router-dom'
import MapPage from "./map-page";
import "../landing-page.css"; // Import the CSS file
export default function HomePage() {
  console.log("Image loading check:", image);
  console.log("Second image loading check:", image2);
  return (
    <div className="homepage-container">
      {/* Navbar */}
      {/* <nav className="navbar">
        <h1 className="nav-logo">Haven</h1>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
      </nav> */}
      
      {/* Hero Section */}
      <div className="hero-section" >
        <img 
          src={image}
          alt="ShelterKitchen" 
          className="hero-image"
        />
        <h2 className="hero-text">
          Unite to Make a Difference Together
        </h2>
      </div>

      {/* About Section */}
      <div className="about-section" id="about">
        <img 
          src={image2} 
          alt="Clothes Donation Box" 
          className="about-image"
        />
        <div className="about-content">
          <h2 className="about-title">Who we are</h2>
          <p className="about-text">
            Welcome to our community of changemakers, where your kindness and 
            support make a tangible difference in people's lives. Join us as we 
            dedicate ourselves to meaningful projects that uplift and empower 
            those in need.
          </p>
          <a href="#learn-more" className="about-button">DONATE</a>
        </div>
      </div>
   
      
    </div>
    
  );
}

