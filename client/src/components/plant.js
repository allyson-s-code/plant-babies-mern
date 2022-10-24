import React from "react";

const Plant = (props) => (
  <div className="plant__img-text-wrapper" id={props._id}>
    <div className="plant__img-wrapper">
      <img src={props.img} alt={props.name} className="plant__img" />
    </div>
    <div className="plant__text-wrapper">
      <h3 className="plant__name">{props.name}</h3>
      <p>{props.careMessage}</p>
    </div>
  </div>
);

export default Plant;
