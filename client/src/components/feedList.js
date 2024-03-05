import React, { useEffect, useState } from "react";
import Plant from "./plant";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Link } from "react-router-dom";
import happyPlant1sm from "../assets/happy-plants/happy-plant1-200w.png";
import happyPlant1Lg from "../assets/happy-plants/happy-plant1-325w.png";
import happyPlant1XL from "../assets/happy-plants/happy-plant1-650w.png";

export default function FeedList() {
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

  //map out the plants that are due or overdue for feeding- except in winter (December-February)
  function feedList(plants) {
    const month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let today = new Date();
    let thisMonth = month[today.getMonth()];

    if (
      thisMonth !== "December" &&
      thisMonth !== "January" &&
      thisMonth !== "February"
    ) {
      plants = plants.filter((plant) => {
        let feedDate = new Date(plant.feedDate);

        return plant.feedDate !== null && feedDate <= today;
      });
      return plants;
    } else {
      return [];
    }
  }

  // This will update the feedDate based on onClick event on plant item
  function handleUpdate(id) {
    //call update database function
    submitData(id);
    //remove from UI list
    removePlant(id);
  }

  // update database with new feedDate
  async function submitData(id) {
    const plant = plants.find((plant) => plant._id === id);
    let date = new Date();
    let freq = plant.feedFrequency;
    const newDate = date.getDate() + freq;

    date.setDate(newDate);

    const editedDate = {
      feedDate: date.toLocaleDateString("en-CA"),
      waterDate: plant.waterDate,
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
    `Feed me every ${plant.feedFrequency} days, please`;

  return (
    <div className="feed-list">
      <h2>Feed Me!</h2>
      {feedList(plants).length > 0 ? (
        <p>check off to reset feed schedule and remove from list</p>
      ) : (
        <div className="feed-list__completed-msg">
          <p>Your babies are fed and happy!</p>
          <img
            srcSet={`${happyPlant1sm} 200w, ${happyPlant1Lg} 325w, ${happyPlant1XL} 650w`}
            src={happyPlant1Lg}
            alt="houseplant illustration"
            className="feed-list__completed-img"
          />
          <Link to="/home">
            <button className="care__btn secondary">Return Home</button>
          </Link>
          <Link to="/plants">
            <button className="care__btn secondary">See Plant List</button>
          </Link>
        </div>
      )}

      <TransitionGroup component="ul" className="feed-list__plants">
        {feedList(plants).map((plant) => (
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
