import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";
import API_URL from "../apiConfig";
import "../css/Index.css";

const HomePage = () => {
  return (
    <div className="index">
      <div className="main-content">
        <div className="gradient-background"></div>
        <div className="container">
          <div className="homepage-container">
            <div className="homepage-text">
              <h1>
                Your Nutrition
                <br />
                Journey Starts Here!
              </h1>
              <p>
                Stay on top of your health with simple,
                <br />
                insightful tracking.
              </p>
            </div>

            <div style={{ padding: "5%" }} className="w-50">
              <Carousel>
                <Carousel.Item>
                  <Image
                    src={`${API_URL}/images/nøkkelhull.png`}
                    className="d-block w-100"
                    alt="First slide"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <Image
                    src={`${API_URL}/images/salad.png`}
                    className="d-block w-100"
                    alt="Second slide"
                  />
                </Carousel.Item>
              </Carousel>
            </div>
          </div>
        </div>

        <section className="features-section">
          <div className="features-card">
            <div className="feature-item">
              <h4>Add New Foods</h4>
              <p>Track food items and ensure they meet health standards.</p>
              <Link
                to="/itemcreate"
                className="small-button"
                onClick={() => window.scrollTo(0, 0)}
              >
                Get Started
              </Link>
            </div>
            <div className="feature-item">
              <h4>Nutritional Info</h4>
              <p>
                View nutritional info to make informed choices and maintain
                balance.
              </p>
              <Link
                to="/items"
                className="small-button"
                onClick={() => window.scrollTo(0, 0)}
              >
                Learn More
              </Link>
            </div>
            <div className="feature-item">
              <h4>Eat Healthy</h4>
              <p>
                View nutritional info to make informed choices and maintain
                balance.
              </p>
              <Link
                to="/about"
                className="small-button"
                onClick={() => window.scrollTo(0, 0)}
              >
                Find Out How
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
