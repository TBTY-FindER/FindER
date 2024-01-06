import React, { useEffect } from "react";
import PermissionAlert from "../components/PermissionAlert";
import PermissionGranted from "../components/PermissionGranted";
import "./screen.css";
import VoiceAnimation from "../components/VoiceAnimation";
import Loader from "../components/Loader";

const Home = () => {
  const [permissionDenied, setPermissionDenied] = React.useState(true);
  const [locationPermission, setLocationPermission] = React.useState(true);
  const [location, setLocation] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  // check if user has given permission to use microphone and location
  useEffect(() => {
    navigator.permissions
      .query({ name: "microphone" })
      .then(function (permissionStatus) {
        if (permissionStatus.state === "granted") {
          setPermissionDenied(false);
          console.log("microphone granted");
        }
      });
    navigator.permissions
      .query({ name: "geolocation" })
      .then(function (permissionStatus) {
        if (permissionStatus.state === "granted") {
          setLocationPermission(false);
          navigator.geolocation.getCurrentPosition(function (position) {
            console.log({
              lat: position.coords.latitude,
              long: position.coords.longitude,
            });
            setLocation({
              lat: position.coords.latitude,
              long: position.coords.longitude,
            });
          });
        }
      });
  }, []);

  return (
    <div className="home">
      {loading ? (
        <Loader />
      ) : (
        <>
          {/* check if location is not empty */}
          {locationPermission || permissionDenied ? (
            <PermissionAlert />
          ) : (
            <PermissionGranted />
          )}
        </>
      )}
    </div>
  );
};

export default Home;
