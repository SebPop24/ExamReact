import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
import API_URL from '../apiConfig';

const HomePage: React.FC = () => {
  return (
    <div className="text-center">
        <h1 className="display-4">Your Nutrition
        Journey Starts Here!</h1>
      <Carousel>
        <Carousel.Item>
          <Image src={`${API_URL}/images/nøkkelhull.png`} className="d-block w-100" alt="Pizza" />
        </Carousel.Item>
        <Carousel.Item>
          <Image src={`${API_URL}/images/salad.png`} className="d-block w-100" alt="Fish and Chips" />
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default HomePage;