import Header from "./components/header";
import Home from "./pages/home";
import Care from "./pages/care";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";

const App = () => (
  <div className="app-main">
    <Router>
      <Header />
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="/care" element={ <Care /> } />
          <Route path="/update" element={ <Care /> } />
        </Routes>
    </Router>
  </div>
);

export default App;
