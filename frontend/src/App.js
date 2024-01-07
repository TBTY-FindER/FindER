import Home from "./screens/Home";
import SecondPage from "./screens/HospitalList";
import "./styles.css";
import { useEffect, useState } from "react";
import { Person } from "./classes/Person";
import ApiClient from "./components/ApiClient";
import { geocode } from "./components/geocode";
import HoldOnVoice from "./sounds/HolnOn.mp3";
import Caption from "./components/Caption";
import ReadyVoice from "./sounds/Ready.mp3";

function App() {
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [situation, setSituation] = useState("");
  const [age, setAge] = useState("");
  const [submit, setSubmit] = useState(false);
  const [geolocation, setGeolocation] = useState({});
  const [response, setResponse] = useState([{}]);
  const [readyToSubmit, setReadyToSubmit] = useState(false);
  const [caption, setCaption] = useState(".....");
  const [responseUpdated, setResponseUpdated] = useState(false);
  const [advice, setAdvice] = useState("");

  const updateAdvice = (advice) => {
    setAdvice(advice);
  };

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

  const updateCaption = (caption) => {
    setCaption(caption);
  };

  useEffect(() => {
    if (readyToSubmit) {
      if (typeof address === "string") {
        // switch address to geolocation
        console.log(address);
        geocode(address)
          .then((result) => {
            setAddress(result);
            console.log(result);
            const person = new Person(age, gender, situation, result);
            console.log(person);
            console.log(geolocation);
            // perform api call here!
            ApiClient.GetRecommendation(person)
              .then((r) => {
                console.log(r);
                setResponse(r);
              })
              .catch((e) => {
                console.log(e);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        console.log("isobject");
        const person = new Person(age, gender, situation, address);
        console.log(person);
        console.log(geolocation);
        // perform api call here!
        ApiClient.GetRecommendation(person)
          .then((result) => {
            console.log(result);
            setResponse(result);
            updateAdvice(result[0].advice);
          })
          .catch((err) => {
            throw err;
          });
      }
    }
  }, [readyToSubmit, age, gender, situation, geolocation, address]);

  useEffect(() => {
    if (response.length > 1 && !responseUpdated) {
      console.log(response);
      setSubmit(true);
      setReadyToSubmit(false);
      const readyAudio = new Audio(ReadyVoice);
      readyAudio.play();
      updateCaption(
        "The list of ER rooms is now ready for you. Please proceed to view your options."
      );
      setResponseUpdated(true);
    }
  }, [response]);

  const submitHandler = () => {
    const holdOnAudio = new Audio(HoldOnVoice);
    holdOnAudio.play();
    updateCaption(
      "Please hold on while we compile a list of ER rooms suitable for your needs."
    );
    setReadyToSubmit(true);
  };

  return (
    <div className="container">
      <div className="caption">
        <Caption
          caption={caption}
          advice={advice}
          updateCaption={updateCaption}
        />
      </div>
      {!submit ? (
        <Home
          addressHandler={addressHandler}
          genderHandler={genderHandler}
          situationHandler={situationHandler}
          submitHandler={submitHandler}
          ageHandler={ageHandler}
          geolocationHandler={geolocationHandler}
          updateCaption={updateCaption}
          updateAdvice={updateAdvice}
        />
      ) : (
        <SecondPage
          address={address}
          gender={gender}
          situation={situation}
          age={age}
          response={response}
        />
      )}
    </div>
  );
}

export default App;
