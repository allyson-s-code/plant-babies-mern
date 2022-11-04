import React, { useEffect, useState } from "react";
import Plant from "../components/plant";
import { Link } from "react-router-dom";
import ellipses2 from "../assets/ellipses2.png";

function PlantList() {
  const [plants, setPlants] = useState([]);

  //fetches all the records from the database
  useEffect(() => {
    async function getPlants() {
      const response = await fetch("http://localhost:4000/plants/");

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

  // This method will delete a record
  async function deleteRecord(id) {
    await fetch(`http://localhost:4000/${id}`, {
      method: "DELETE",
    });

    const newPlants = plants.filter((el) => el._id !== id);
    setPlants(newPlants);
  }

  const careMessage = (plant) => `${plant.botanicalName}`;

  // This section will display the list with the individual plants
  return (
    <div className="plant-list">
      <h2>Plant Family</h2>
      <Link to={`/plants/create`}>
        <button className="create__btn mini">+ New</button>
      </Link>
      <ul className="plant-list__plants">
        {plants.map((plant) => (
          <li className="plant" key={plant._id}>
            <Link to={`/plants/${plant._id}`}>
              <Plant
                plant={plant}
                deleteRecord={() => deleteRecord(plant._id)}
                key={plant._id}
                name={plant.name}
                img={plant.img}
                careMessage={careMessage(plant)}
                waterFrequency={plant.waterFrequency}
                feedFrequency={plant.feedFrequency}
                light={plant.light}
                care={plant.care}
                waterDate={plant.waterDate}
                feedDate={plant.feedDate}
              />
              <img
                src={ellipses2}
                alt="more details"
                className="plant__details-link"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PlantList;
