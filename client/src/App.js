import Header from "./components/header";
import Home from "./pages/home";
import Care from "./pages/care";
import Plants from "./pages/plants";
import PlantDetails from "./components/plantDetails";
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

//fade out/fade om transition between pages
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
        <Route path="/home" element={<Home />} />
        <Route path="/care" element={<Care />} />
        <Route path="/plants" element={<Plants />} />
        <Route path="/plants/:id" element={<PlantDetails />} />
      </Routes>
    </div>
  );
}
