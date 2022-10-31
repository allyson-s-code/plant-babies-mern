import React, { useEffect, useState } from "react";
import Plant from "./plant";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Link } from "react-router-dom";
import happyPlant1 from "../assets/happy-plant1.png";

export default function FeedList() {
  const [plants, setPlants] = useState([]);

  //fetches all the records from the database
  useEffect(() => {
    async function getPlants() {
      const response = await fetch("http://localhost:4000/plant/");

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
      month !== "January" &&
      month !== "February"
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
  console.log(plants);

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
    let freq = plant.feedFrequency;
    const newDate = date.getDate() + freq;

    date.setDate(newDate);

    const editedDate = {
      feedDate: date.toLocaleDateString("en-CA"),
      waterDate: plant.waterDate,
    };
    // This will send a post request to update the data in the database.
    await fetch(`http://localhost:4000/update/${id}`, {
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
            src={happyPlant1}
            alt="houseplant illustration"
            className="feed-list__completed-img"
          />
          <Link to="/home">
            <button className="care__btn">Return Home</button>
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
