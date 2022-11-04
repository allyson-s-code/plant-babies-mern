import React from "react";
import homeImg from "../assets/home-img.jpg";
import { Link } from "react-router-dom";

const Home = () => (
  <section className="home-section">
    <div className="home__img-wrapper">
      <img src={homeImg} alt="woman holding plants" className="home__img" />
    </div>
    <h2 className="home__heading">
      Check on your <span>babies</span> and show some love
    </h2>
    <Link to="/care">
      <button className="home__btn primary">Check In</button>
    </Link>
    <Link to="/plants">
      <button className="home__btn primary">See Plant List</button>
    </Link>
  </section>
);

export default Home;
