import React, { useEffect } from "react";
import PermissionAlert from "../components/PermissionAlert";
import "./screen.css";
import VoiceAnimation from "../components/VoiceAnimation";
import Loader from "../components/Loader";

const Home = () => {
  const [permissionOpen, setPermissionOpen] = React.useState(true);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  // check if user has given permission to use microphone and location
  useEffect(() => {
    navigator.permissions
      .query({ name: "microphone" })
      .then(function (permissionStatus) {
        if (permissionStatus.state === "granted") {
          setPermissionOpen(false);
          console.log("microphone granted");
        }
      });
    navigator.permissions
      .query({ name: "geolocation" })
      .then(function (permissionStatus) {
        if (permissionStatus.state === "granted") {
          setPermissionOpen(false);
          console.log("geolocation granted");
        }
      });
  }, []);

  return (
    <div className="home">
      {loading ? (
        <Loader />
      ) : (
        <>{permissionOpen ? <PermissionAlert /> : <VoiceAnimation />}</>
      )}
    </div>
  );
};

export default Home;
