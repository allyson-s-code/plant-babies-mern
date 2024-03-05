import React, { useEffect, useState } from "react";
import Plant from "./plant";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Link } from "react-router-dom";
import happyPlant2sm from "../assets/happy-plants/happy-plant2-200w.png";
import happyPlant2Lg from "../assets/happy-plants/happy-plant2-325w.png";
import happyPlant2XL from "../assets/happy-plants/happy-plant2-650w.png";

export default function WaterList() {
  const [plants, setPlants] = useState([]);

  //fetches all the records from the database
  useEffect(() => {
    async function getPlants() {
      const response = await fetch(
        "https://plant-babies-backend.onrender.com/plants/"
      );

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const plants = await response.json();
      setPlants(plants);
    }

    getPlants();

    return;
  }, []);

  //map out the plants that are due or overdue for watering
  function waterList(plants) {
    plants = plants.filter((plant) => {
      let today = new Date().getTime();
      let waterDate = new Date(plant.waterDate).getTime();

      return waterDate <= today;
    });
    // setPlants(plants); ***infinite loop error***
    return plants;
  }

  // This will update the waterDate based on onClick event on plant item
  function handleUpdate(id) {
    //call update database function
    submitData(id);
    //remove from UI list
    removePlant(id);
  }

  // update database with new waterDate
  async function submitData(id) {
    const plant = plants.find((plant) => plant._id === id);
    let date = new Date();
    let freq = plant.waterFrequency;
    const newDate = date.getDate() + freq;

    date.setDate(newDate);

    const editedDate = {
      waterDate: date.toLocaleDateString("en-CA"),
      feedDate: plant.feedDate,
    };
    // This will send a post request to update the data in the database.
    await fetch(`https://plant-babies-backend.onrender.com/update/${id}`, {
      method: "POST",
      body: JSON.stringify(editedDate),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(`item with id ${id} updated`);
  }

  const removePlant = (id) =>
    setPlants((plants) => plants.filter((plant) => plant._id !== id));

  const careMessage = (plant) =>
    `Water me every ${plant.waterFrequency} days, please`;

  return (
    <div className="water-list">
      <h2>Water Me!</h2>
      {waterList(plants).length > 0 ? (
        <p>check off to reset water schedule and remove from list</p>
      ) : (
        <div className="water-list__completed-msg">
          <p>Your babies are watered and happy!</p>
          <img
            srcSet={`${happyPlant2sm} 200w, ${happyPlant2Lg} 325w, ${happyPlant2XL} 650w`}
            src={happyPlant2Lg}
            alt="houseplant illustration"
            className="water-list__completed-img"
          />
          <Link to="/home">
            <button className="care__btn secondary">Return Home</button>
          </Link>
          <Link to="/plants">
            <button className="care__btn secondary">See Plant List</button>
          </Link>
        </div>
      )}

      <TransitionGroup component="ul" className="water-list__plants">
        {waterList(plants).map((plant) => (
          <CSSTransition key={plant._id} timeout={700} classNames="item">
            <li className="plant">
              <Plant
                name={plant.name}
                img={plant.img}
                careMessage={careMessage(plant)}
              />
              <span
                onClick={() => handleUpdate(plant._id)}
                className="plant__check"
              >
                X
              </span>
            </li>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
}
