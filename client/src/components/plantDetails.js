import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function PlantDetails() {
  const [plant, setPlant] = useState([]);
  const params = useParams();

  //fetches plant from database
  useEffect(() => {
    async function getPlant() {
      const id = params.id;
      const response = await fetch(
        `https://plant-babies-server.cyclic.app/plants/${id}`
      );

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const plant = await response.json();
      if (!plant) {
        window.alert(`Record with id ${id} not found`);

        return;
      }
      setPlant(plant);
    }

    getPlant();

    return;
  }, [params.id]);

  const deleteRecord = async () => {
    const id = params.id;
    await fetch(`http://localhost:4000/${id}`, {
      method: "DELETE",
    });
  };

  return (
    <section className="details-section">
      <div className="plant-details" id={plant._id}>
        <div className="plant-details__img-wrapper">
          <img
            src={plant.img}
            alt={plant.name}
            className="plant-details__img"
          />
        </div>
        <div className="plant-details__text-wrapper">
          <h4 className="plant-details__name">
            <strong>Name: </strong>
            {plant.name}
          </h4>
          <p>
            <strong>Botanical Name: </strong>
            {plant.botanicalName}
          </p>
          <p>
            <strong>Water Frequency (in days): </strong>
            {plant.waterFrequency}
          </p>
          <p>
            <strong>Feed Frequency (in days):</strong> {plant.feedFrequency}
          </p>
          <p>
            <strong>Light: </strong>
            {plant.light}
          </p>
          <p>
            <strong>Care: </strong>
            {plant.care}
          </p>
          <p>
            <strong>Next Water Date: </strong>
            {plant.waterDate}
          </p>
          <p>
            <strong>Next Feed Date: </strong>
            {plant.feedDate}
          </p>
        </div>
      </div>
      <div className="button-container">
        <Link to={`/plants`}>
          <button className="back__btn mini">Back</button>
        </Link>
        <Link to={`/${plant._id}/edit`}>
          <button className="edit__btn mini">Edit</button>
        </Link>

        <Link to={`/plants`}>
          <button
            type="button"
            onClick={() => {
              if (
                window.confirm("Are you sure you wish to delete this item?")
              ) {
                deleteRecord();
              }
            }}
            className="delete__btn mini"
          >
            Delete
          </button>
        </Link>
      </div>
    </section>
  );
}
