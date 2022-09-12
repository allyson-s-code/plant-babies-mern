import React from "react";
import homeImg from "../assets/home-img.jpg";

const Home = () => (
  <div className="home-section">
    <div className="home__img-wrapper">
      <img src={homeImg} alt="woman holding plants" className="home__img" />
    </div>
    <h2 className="home__heading">
      Check on your <span>babies</span> and show some love
    </h2>
    <a href="./care">
      <button className="home__btn">Check In</button>
    </a>
  </div>
);

export default Home;
