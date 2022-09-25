import React, { useEffect, useState } from "react";
import Plant from "./plant";
import { useParams } from "react-router";


export default function WaterList() {
 const params = useParams();
 const [plants, setPlants] = useState([]);
 const [updatedPlant, setUpdatedPlant] = useState({
   waterDate: ""
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
     })
     // setPlants(plants); ***infinite loop error***
     return plants;
     //or should I setPlants  
 }
 console.log(plants)

 
 // This will update the waterDate based on onClick event on plant item
function handleUpdate(id) {
  //Set plant based on id passed thru onClick
  const plant = plants.find(plant => plant._id === id);
  setUpdatedPlant(plant);
  
    
  //set useState
  // This will calculate new waterDate
  setUpdatedPlant((updatedPlant)=> {
    let date = new Date();
    let freq = plant.waterFrequency;
    date.setDate(date.getDate() + freq)
    console.log(date)
    return {
      ...updatedPlant,
      waterDate: date
    };
  });
  
  //update database
  submitData(id);
  //remove from UI list
  removePlant(id);
}

console.log(updatedPlant);

// update database 
 async function submitData(id, date) {
   const editedDate = {
     waterDate: date
   };
    // This will send a post request to update the data in the database.
   await fetch(`http://localhost:4000/update/${params.id}`, {
     method: "PUT",
     body: JSON.stringify(editedDate),
     headers: {
       'Content-Type': 'application/json'
     },
   });
   console.log(`item with id ${id} updated`);
 }

 const removePlant = (id) => 
  setPlants((plants) => plants.filter((plant) => plant._id !== id));
 
 return (
   <div className="water-list">
     <h2>Water Me!</h2>
     <p>check off to reset water schedule and remove from list</p>
     <ul className="water-list__plants">
       { waterList(plants).map(plant =>
         <li key={plant._id} className="plant">
           <Plant name={plant.name} img={plant.img} waterFrequency={plant.waterFrequency} removePlant={removePlant} />
           <span onClick={() => handleUpdate(plant._id)} className="plant__check">X</span>
         </li>) }
     </ul>
   </div>
 );
}
