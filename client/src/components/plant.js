
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
 

const Plant = (props) => {
  const [plant, setPlant] = useState({
    waterDate: "",
    waterFrequency: ""
  });
  const params = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    async function getPlantData() {
      const id = params.id.toString();
      const response = await fetch(`http://localhost:4000/plant/${params.id.toString()}`);
  
      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
  
      const plantData = await response.json();
      if (!plant) {
        window.alert(`Plant with id ${id} not found`);
        navigate("/");
        return;
      }
  
      setPlant(plantData);
    }
  
    getPlantData();
    
    return;
  }, [params.id, navigate]);
  
  // This will update the state properties.
  
  const newWaterDate = (props) => {
    let today = new Date();
    let freq = props.waterFrequency;
    return today.setDate(today.getDate() + freq)
  }
  
  const updateDate = (id, plant) => {
    return setWaterDate((date) => {
      return { ...date, ...newWaterDate };
    });
    console.log(params.id);
  }

  async function onSubmit(e) {
    e.preventDefault();
    
    const editedDate = {
      waterDate: {newWaterDate}
    };
  
    // This will send a post request to update the data in the database.
    await fetch(`http://localhost:4000/update/${params.id}`, {
      method: "POST",
      body: JSON.stringify(editedDate),
      headers: {
        'Content-Type': 'application/json'
      },
    });
  
    navigate("/");
  }
 
  return (
    <li className="plant">
      <div className="plant__img-wrapper">
        <img
          src={props.img}
          alt={props.name}
          className="plant__img"
        />
      </div>
      <h3 className="plant__name">{props.name}</h3>
      <label className="plant__care-form">
        <input onClick={() => (updateDate(props._id))} type="checkbox" name="checkbox" id={props._id} />
        <FontAwesomeIcon icon="fa-solid fa-check" />
      </label>
    </li>
  );
}

export default Plant;
