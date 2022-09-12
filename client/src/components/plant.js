import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Plant = (props) => (
  <li className="plant">
    <div className="plant__img-wrapper">
      <img
        src={props.img}
        alt={props.name}
        className="plant__img"
      />
    </div>
    <h3 className="plant__name">{props.name}</h3>
    <label className="plant__care-form">
      <input type="checkbox" name="checkbox" />
      <FontAwesomeIcon icon="fa-solid fa-check" />
    </label>
  </li>
);

export default Plant;
