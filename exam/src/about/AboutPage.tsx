import React from "react"; // Importing React for creating the functional component.
import "../css/About.css"; // Importing the CSS

const AboutPage: React.FC = () => {
  // Defining a functional component with TypeScript type for props (React.FC).

  return (
    <div className="about-page">
      {" "}
      {/* Wrapper div for the entire About Page */}
      {/* Header section */}
      <div className="about-header">
        <span className="about-subtitle">Empowering</span> {/* Subtitle text */}
        <h2 className="about-main-title">Healthier Choices</h2>{" "}
        {/* Main title text */}
      </div>
      <div className="container">
        {" "}
        {/* Bootstrap container for consistent layout */}
        {/* Features Section */}
        <div className="features row">
          {" "}
          {/* Row for aligning feature items horizontally */}
          {/* Feature 1: Transparency */}
          <div className="feature-item col-md-4">
            {" "}
            {/* Bootstrap column for responsive design */}
            <img
              src="/images/magnifying-glass.png"
              alt="magnifying-glass"
              className="feature-logo"
            />{" "}
            {/* Feature icon */}
            <h4 className="feature-title">Transparency</h4>{" "}
            {/* Feature title */}
            <p className="feature-description">
              Access accurate and up-to-date nutritional information on a wide
              range of products, empowering users to make informed choices with
              ease.
            </p>{" "}
            {/* Feature description */}
          </div>
          {/* Feature 2: Health Focus */}
          <div className="feature-item col-md-4">
            <img
              src="/images/heart-attack.png"
              alt="Heart"
              className="feature-logo"
            />{" "}
            {/* Feature icon */}
            <h4 className="feature-title">Health Focus</h4>{" "}
            {/* Feature title */}
            <p className="feature-description">
              Certified products that meet "Nøkkelhull" standards promote
              healthier options, focusing on balanced nutrition and reduced
              levels of calories, fat, and salt.
            </p>{" "}
            {/* Feature description */}
          </div>
          {/* Feature 3: Ease of Use */}
          <div className="feature-item col-md-4">
            <img
              src="/images/mobile.png"
              alt="Mobile"
              className="feature-logo"
            />{" "}
            {/* Feature icon */}
            <h4 className="feature-title">Ease of Use</h4> {/* Feature title */}
            <p className="feature-description">
              Our platform provides intuitive tools and resources, making it
              simple for both companies and consumers to navigate nutritional
              data and make better dietary decisions.
            </p>{" "}
            {/* Feature description */}
          </div>
        </div>
      </div>
      {/* Divider */}
      <div className="divider"></div>{" "}
      {/* A visual separator between sections */}
      {/* Call to Action Section */}
      <div className="cta-container">
        <a href="/" className="cta-button">
          Explore Our Platform
        </a>{" "}
        {/* Link styled as a button for user action */}
      </div>
    </div>
  );
};

export default AboutPage; // Exporting the component to be used elsewhere in the application.
