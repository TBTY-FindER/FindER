import React, { useEffect, useState } from "react";
import PermissionAlert from "../components/PermissionAlert";
import PermissionGranted from "../components/PermissionGranted";
import "./screen.css";
import VoiceAnimation from "../components/VoiceAnimation";
import Loader from "../components/Loader";
import Form from "../components/Form";

const Home = ({ addressHandler, genderHandler, locationHandler }) => {
  const [permissionDenied, setPermissionDenied] = useState(true);
  const [locationPermission, setLocationPermission] = useState(true);
  const [loading, setLoading] = useState(true);
  const [permissionPage, setPermissionPage] = useState(true);

  const endPermissionPage = () => {
    setPermissionPage(false);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

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
    await navigator.permissions
      .query({ name: "geolocation" })
      .then(function (permissionStatus) {
        if (permissionStatus.state === "granted") {
          setLocationPermission(false);
          navigator.geolocation.getCurrentPosition(function (position) {
            locationHandler({
              lat: position.coords.latitude,
              long: position.coords.longitude,
            });
          });
        }
      });
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
            <Form />
          ) : (
            <VoiceAnimation />
          )}
        </>
      )}
    </div>
  );
};

export default Home;
