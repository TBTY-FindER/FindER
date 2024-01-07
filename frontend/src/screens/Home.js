import React, { useEffect, useState } from "react";
import PermissionAlert from "../components/PermissionAlert";
import PermissionGranted from "../components/PermissionGranted";
import "./screen.css";
import VoiceAnimation from "../components/VoiceAnimation";
import Loader from "../components/Loader";
import Form from "../components/Form";

const Home = ({ addressHandler, genderHandler, situationHandler }) => {
  const [permissionDenied, setPermissionDenied] = useState(true);
  const [locationPermission, setLocationPermission] = useState(true);
  const [loading, setLoading] = useState(true);
  const [permissionPage, setPermissionPage] = useState(true);
  const [address, setAddress] = useState("");

  const endPermissionPage = () => {
    setPermissionPage(false);
  };

  async function micPermission() {
    await navigator.permissions
      .query({ name: "microphone" })
      .then(function (permissionStatus) {
        if (permissionStatus.state === "granted") {
          setPermissionDenied(false);
        }
      });
  }

  async function geoPermission() {
    try {
      const permissionStatus = await navigator.permissions.query({
        name: "geolocation",
      });

      if (permissionStatus.state === "granted") {
        // Using a Promise to handle getCurrentPosition since it's not natively async
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        // Set address and call addressHandler after getting position
        const currentAddress = `lat: ${position.coords.latitude}, long: ${position.coords.longitude}`;
        setAddress(currentAddress);
        setLocationPermission(false);
        setLoading(false);
      } else {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    } catch (error) {
      console.error("Error getting geolocation permission:", error);
      // Handle error (e.g., user denied geolocation permission)
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }

  // check if user has given permission to use microphone and location
  useEffect(() => {
    micPermission();
    geoPermission();
  });

  return (
    <div className="home">
      {permissionPage ? (
        <>
          {loading ? (
            <Loader />
          ) : (
            <>
              {/* check if location is not empty */}
              {locationPermission || permissionDenied ? (
                <PermissionAlert handleButton={endPermissionPage} />
              ) : (
                <PermissionGranted handleButton={endPermissionPage} />
              )}
            </>
          )}
        </>
      ) : (
        <>
          {locationPermission || permissionDenied ? (
            <Form
              addressHandler={addressHandler}
              genderHandler={genderHandler}
              situationHandler={situationHandler}
              address={address}
            />
          ) : (
            <VoiceAnimation />
          )}
        </>
      )}
    </div>
  );
};

export default Home;
