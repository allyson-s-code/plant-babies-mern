import Header from "./components/header";
import Home from "./pages/home";
import Care from "./pages/care";
import PlantList from "./components/plantList";
import PlantDetails from "./components/plantDetails";
import NewPlant from "./components/create";
import UpdatePlantForm from "./components/edit";
import PageNotFound from "./components/pageNotFound";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import React from "react";

export default function App() {
  return (
    <Router>
      <div className="app-main">
        <Header />
        <Content />
      </div>
    </Router>
  );
}

//fade out/fade on transition between pages
function Content() {
  const location = useLocation();

  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransistionStage] = useState("fadeIn");

  useEffect(() => {
    if (location !== displayLocation) setTransistionStage("fadeOut");
  }, [location, displayLocation]);

  return (
    <div
      className={`${transitionStage} content`}
      onAnimationEnd={() => {
        if (transitionStage === "fadeOut") {
          setTransistionStage("fadeIn");
          setDisplayLocation(location);
        }
      }}
    >
      <Routes location={displayLocation}>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/care" element={<Care />} />
        <Route path="/plants" element={<PlantList />} />
        <Route path="/plants/:id" element={<PlantDetails />} />
        <Route path="/plants/create" element={<NewPlant />} />
        <Route path="/:id/edit" element={<UpdatePlantForm />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}
