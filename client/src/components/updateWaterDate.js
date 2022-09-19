import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import Plant from "./plant";


export default function UpdateWaterDate(props) {
  const [waterDate, setWaterDate] = useState({
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
      if (!plantData) {
        window.alert(`Plant with id ${id} not found`);
        navigate("/");
        return;
      }
  
      setWaterDate(plantData.waterDate);
    }
  
    getPlantData();
    
    return;
  }, [params.id, navigate]);
  
  // This will update the state properties.
  async function newWaterDate(props)  {
    let today = new Date();
    let freq = props.waterFrequency;
    return today.setDate(today.getDate() + freq)
  }
  
  const updateDate = (id, plant) => {
    return setWaterDate((date) => {
      return { ...date, ...newWaterDate };
    });
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
}