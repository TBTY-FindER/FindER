import Home from "./screens/Home";
import SecondPage from "./screens/HospitalList";
import "./styles.css";
import { useState } from "react";

function App() {
  return (
    <div className="container">
      <Home />
      <SecondPage />
    </div>
  );
}

export default App;
