import React, { useEffect, useState } from "react";
import Plant from "./plant";

export default function WaterList(props) {
  const [plants, setPlants] = useState([]);

  //fetches the records from the database
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
  }, [plants.length]);

  //this method will map out the records in a list
  function waterList() {
    return plants.map((plant) => {
      return <Plant name={plant.name} img={plant.img} key={plant._id} />;
    });
  }

  return (
    <div className="water-list">
      <h2>Water Me!</h2>
      <p>check off to reset water schedule and remove from list</p>
      <ul className="water-list__plants">{waterList()}</ul>
    </div>
  );
}
