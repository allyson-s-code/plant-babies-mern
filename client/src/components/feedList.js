import React, { useEffect, useState } from "react";
import Plant from "./plant";


export default function FeedList() {
 const [plants, setPlants] = useState([]);
 const [updatedPlant, setUpdatedPlant] = useState({
   feedDate: "",
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
 
 
 //map out the plants that are due or overdue for feeding- except in winter (December-February)
 function feedList(plants) {
  const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  let today = new Date();
  let thisMonth = month[today.getMonth()];
  
  if (thisMonth !== "December" && month !== "January" && month !== "February") {
    plants = plants.filter((plant) => {
      let feedDate = new Date(plant.feedDate);
      return feedDate <= today;
    })
    return plants;
  } else {
    return [];
  }
      
 }
 console.log(plants)

 
 // This will update the waterDate based on onClick event on plant item
function handleUpdate(id) {
  //Set plant based on id passed thru onClick
  const plant = plants.find(plant => plant._id === id);
  
  //set useState
  //calculate new waterDate
  let date = new Date();
  let freq = plant.waterFrequency;
  date.setDate(date.getDate() + freq)
  setUpdatedPlant({waterDate:date}) 

  //call update database function
  submitData(id);
  //remove from UI list
  removePlant(id);
}



// update database with new waterDate
 async function submitData(id) {
   const plant = plants.find(plant => plant._id === id)
   let date = new Date();
   let freq = plant.feedFrequency;
   const newDate = date.getDate() + freq
   
   date.setDate(newDate);
   
   const editedDate = {
    feedDate: date.toLocaleDateString("en-CA"),
    waterDate: plant.waterDate
   };
    // This will send a post request to update the data in the database.
   await fetch(`http://localhost:4000/update/${id}`, {
     method: "POST",
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
   <div className="feed-list">
     <h2>Feed Me!</h2>
     {feedList(plants).length > 0 
      ? <p>check off to reset feed schedule and remove from list</p>
      : <p>Your babies are fed and happy!</p>  
      }
     
     <ul className="feed-list__plants">
       { feedList(plants).map(plant =>
         <li key={plant._id} className="plant">
           <Plant name={plant.name} img={plant.img} feedFrequency={plant.feedFrequency}  />
           <span onClick={() => handleUpdate(plant._id)} className="plant__check">X</span>
         </li>) }
     </ul>
   </div>
 );
}