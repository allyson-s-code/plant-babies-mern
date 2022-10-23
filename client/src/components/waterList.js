import React, { useEffect, useState } from "react";
import Plant from "./plant";

export default function WaterList() {
  const [plants, setPlants] = useState([]);
  const [updatedPlant, setUpdatedPlant] = useState({
    waterDate: "",
    feedDate: "",
  });

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
  console.log(plants);
  console.log(waterList(plants));

  // This will update the waterDate based on onClick event on plant item
  function handleUpdate(id) {
    //Set plant based on id passed thru onClick
    const plant = plants.find((plant) => plant._id === id);

    //set useState
    //calculate new waterDate
    let date = new Date();
    let freq = plant.waterFrequency;
    date.setDate(date.getDate() + freq);
    setUpdatedPlant({ waterDate: date });

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

  return (
    <div className="water-list">
      <h2>Water Me!</h2>
      {waterList(plants).length > 0 ? (
        <p>check off to reset water schedule and remove from list</p>
      ) : (
        <p>Your babies are watered and happy!</p>
      )}

      <ul className="water-list__plants">
        {waterList(plants).map((plant) => (
          <li key={plant._id} className="plant">
            <Plant
              name={plant.name}
              img={plant.img}
              waterFrequency={plant.waterFrequency}
            />
            <span
              onClick={() => handleUpdate(plant._id)}
              className="plant__check"
            >
              X
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
