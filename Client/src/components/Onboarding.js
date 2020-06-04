import React from "react";
import { Carousel } from "react-bootstrap";
import img1 from "../img/img1.svg";
import img2 from "../img/img2.svg";
import img3 from "../img/img3.svg";
import img4 from "../img/img4.png";

const Onboarding = () => {
  return (
    <div>
      <Carousel>
        <Carousel.Item>
          <Carousel.Caption>
            <h3 className="caption-label">Are you a Swaper?</h3>
            <p className="caption-text">
              Welcome to the home for creatives
            </p>
          </Carousel.Caption>
          <img
            className="d-block w-100 onboarding-img"
            src={img1}
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <Carousel.Caption>
            <h3 className="caption-label">Get known</h3>
            <p className="caption-text">
              Upload your creations and show the world what you're capable to make
            </p>
          </Carousel.Caption>
          <img
            className="d-block w-100 onboarding-img"
            src={img2}
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <Carousel.Caption>
            <h3 className="caption-label">Explore</h3>
            <p className="caption-text">
              Discover amazing creations from others
            </p>
          </Carousel.Caption>
          <img
            className="d-block w-100 onboarding-img"
            src={img3}
            alt="Third slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <Carousel.Caption>
            <h3 className="caption-label">Chat & swap!</h3>
            <p className="caption-text">
             Meet people and exchange the creations
            </p>
          </Carousel.Caption>
          <img
            className="d-block w-100 onboarding-img"
            src={img4}
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Onboarding;
