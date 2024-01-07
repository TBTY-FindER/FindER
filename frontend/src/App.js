import Home from "./screens/Home";
import SecondPage from "./screens/HospitalList";
import "./styles.css";
import { useState } from "react";

function App() {
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [situation, setSituation] = useState("");

  const addressHandler = (address) => {
    setAddress(address);
  };

  const genderHandler = (gender) => {
    setGender(gender);
  };

  const situationHandler = (situation) => {
    setSituation(situation);
  };

  return (
    <div className="container">
      <Home
        addressHandler={addressHandler}
        genderHandler={genderHandler}
        situationHandler={situationHandler}
      />
      <SecondPage address={address} gender={gender} situation={situation} />
    </div>
  );
}

export default App;
