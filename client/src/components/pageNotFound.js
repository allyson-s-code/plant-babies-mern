import React from "react";
import { Link } from "react-router-dom";
import soilImage from "../assets/neslihan-gunaydin-soil.jpg";

const PageNotFound = () => (
  <section className="not-found">
    <div className="not-found__wrapper">
      <h1>404</h1>
      <h2>Oops! Something&apos;s amiss!</h2>
      <div className="not-found__img-wrapper">
        <img
          src={soilImage}
          alt="potting soil and scoop"
          className="not-found__img"
        />
      </div>
      <Link to="/home">
        <button className="care__btn secondary">Return Home</button>
      </Link>
    </div>
  </section>
);

export default PageNotFound;
