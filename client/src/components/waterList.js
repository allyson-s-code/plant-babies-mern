import React, { useEffect, useState } from "react";
import Plant from "./plant";
import { useParams } from "react-router";


export default function WaterList() {
 const params = useParams();
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
 }, [plants.length]);
 
 
 //map out the plants that are due or overdue for watering
 function waterList(plants) {
     let filter = plants.filter((plant) => {
       let today = new Date().getTime();
       let waterDate = new Date(plant.waterDate).getTime();
 
       return waterDate <= today;
     })
     return filter;
    
 }
 console.log(plants)

 
 // This will update the waterDate based on onClick event on plant item
function handleUpdate(id) {
  //Set plant based on id passed thru onClick
  const plant = plants.find(plant => plant._id === id);
  
  // This will calculate new waterDate
  let date = new Date();
  const freq = plant.waterFrequency;
  date = date.setDate(date.getDate() + freq)
  
  //trigger function to send update to database
  submitData(id);
  console.log(new Date(date))
}
 
// This will update database 
 async function submitData(id, date) {
   const editedDate = {
     waterDate: {date}
   };
    // This will send a post request to update the data in the database.
   await fetch(`http://localhost:4000/update/${params.id}`, {
     method: "POST",
     body: JSON.stringify(editedDate),
     headers: {
       'Content-Type': 'application/json'
     },
   });
   console.log(`item with id ${id} updated`);
 }
 
 
 
 return (
   <div className="water-list">
     <h2>Water Me!</h2>
     <p>check off to reset water schedule and remove from list</p>
     <ul className="water-list__plants">
       { waterList(plants).map(plant =>
         <li key={plant._id} className="plant">
           <Plant name={plant.name} img={plant.img} waterFrequency={plant.waterFrequency} removePlant={plant.removeP} />
           <span onClick={() => handleUpdate(plant._id)} className="plant__check">X</span>
         </li>) }
     </ul>
   </div>
 );
}
