import React, { useEffect, useState } from "react";

export default function PlantDetails() {
  const [plant, setPlant] = useState([]);
  console.log(plant.id);
  //fetches plant from database
  useEffect(() => {
    async function getPlant(id) {
      const response = await fetch(`http://localhost:4000/plant/${id}`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const plant = await response.json();
      setPlant(plant);
    }

    getPlant();

    return;
  }, []);

  return (
    <div className="plant-details" id={plant._id}>
      <div className="plant-details__img-wrapper">
        <img src={plant.img} alt={plant.name} className="plant-details__img" />
      </div>
      <div className="plant-details__text-wrapper">
        <h3 className="plant-details__name">Name: {plant.name}</h3>
        <p>Botanical Name: {plant.botanicalName}</p>
        <p>Water Frequency: {plant.waterFrequency}</p>
        <p>Feed Frequency: {plant.feedFrequency}</p>
        <p>Light: {plant.light}</p>
        <p>Care: {plant.care}</p>
        <p>Next Water Date: {plant.waterDate}</p>
        <p>Next Feed Date: {plant.feedDate}</p>
      </div>
    </div>
  );
}
