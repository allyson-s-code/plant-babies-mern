
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UpdateWaterDate  from "./updateWaterDate";

const Plant = (props) => (
  <li className="plant">
    <div className="plant__img-wrapper">
      <img
        src={props.img}
        alt={props.name}
        className="plant__img"
      />
    </div>
    <div className="plant__text-wrapper">
      <h3 className="plant__name">{props.name}</h3>
      <p>Water me every {props.waterFrequency} days, please.</p>
    </div>
    <label className="plant__care-form">
      <input onClick="{ UpdateWaterDate(props._id)}" type="checkbox" name="checkbox" />
      <FontAwesomeIcon icon="fa-solid fa-check" />
    </label>
  </li>
);

export default Plant;