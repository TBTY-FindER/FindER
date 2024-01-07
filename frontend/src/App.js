import Home from "./screens/Home";
import SecondPage from "./screens/HospitalList";
import "./styles.css";
import { useState } from "react";
import { Person } from "./classes/Person";
import ApiClient from "./components/ApiClient";

function App() {
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [situation, setSituation] = useState("");
  const [age, setAge] = useState("");
  const [submit, setSubmit] = useState(false);
  const [geolocation, setGeolocation] = useState({});

  const addressHandler = (address) => {
    setAddress(address);
  };

  const genderHandler = (gender) => {
    setGender(gender);
  };

  const situationHandler = (situation) => {
    setSituation(situation);
  };

  const ageHandler = (age) => {
    setAge(age);
  };

  const geolocationHandler = (geolocation) => {
    setGeolocation(geolocation);
  };

  const submitHandler = async () => {
    const person = new Person(age, gender, situation, geolocation);
    let hospitals =  await ApiClient.GetRecommendation(person);
    // person class
    // you will post person to backend
    setSubmit(true);
  };

  return (
    <div className="container">
      {!submit ? (
        <Home
          addressHandler={addressHandler}
          genderHandler={genderHandler}
          situationHandler={situationHandler}
          submitHandler={submitHandler}
          ageHandler={ageHandler}
          geolocationHandler={geolocationHandler}
        />
      ) : (
        <SecondPage
          address={address}
          gender={gender}
          situation={situation}
          age={age}
        />
      )}
    </div>
  );
}

export default App;
