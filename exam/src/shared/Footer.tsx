import React from "react";
import "../assets/css/Layout.css";

const Footer: React.FC = () => {
  return (
    //Footer info
    <div className="footer">
      <ul className="list-unstyled footer-contact-info">
        <li>
          <span className="footer-contact-item">
            Pilestredet Park 0890, 0176 Oslo
          </span>
        </li>
        <li>
          <span className="footer-contact-item">+47 (123) 456-7890</span>
        </li>
        <li>
          <span className="footer-contact-item">
            NutritionTracker@oslomet.no
          </span>
        </li>
        <li>
          <span className="footer-contact-item">
            © {new Date().getFullYear()} My Nutrition Tracker. All rights
            reserved.
          </span>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
