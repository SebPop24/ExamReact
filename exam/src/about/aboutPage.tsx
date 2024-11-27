import React from "react";
import '../css/About.css';


const AboutPage: React.FC = () => {
  return (


    <div className="about-page">
      <div className="about-header">
        <span className="about-subtitle">Empowering</span>
        <h2 className="about-main-title">Healthier Choices</h2>
      </div>

      <div className="container">
        <div className="features row">
          <div className="feature-item col-md-4">
            <img src="/images/magnifying-glass.png" alt="magnifying-glass" className="feature-logo" />
            <h4 className="feature-title">Transparency</h4>
            <p className="feature-description">Access accurate and up-to-date nutritional information on a wide range of products, empowering users to make informed choices with ease.</p>
          </div>
          <div className="feature-item col-md-4">
            <img src="/images/heart-attack.png" alt="Heart" className="feature-logo" />
            <h4 className="feature-title">Health Focus</h4>
            <p className="feature-description">Certified products that meet "Nøkkelhull" standards promote healthier options, focusing on balanced nutrition and reduced levels of calories, fat, and salt.</p>
          </div>
          <div className="feature-item col-md-4">
            <img src="/images/mobile.png" alt="Mobile" className="feature-logo" />
            <h4 className="feature-title">Ease of Use</h4>
            <p className="feature-description">Our platform provides intuitive tools and resources, making it simple for both companies and consumers to navigate nutritional data and make better dietary decisions.</p>
          </div>
        </div>
      </div>

      <div className="divider"></div>
      <div className="cta-container">
        <a href="/" className="cta-button">Explore Our Platform</a>
      </div>
      </div>
    
    
  );
};

export default AboutPage;
