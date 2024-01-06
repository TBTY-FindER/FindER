import React, { useEffect } from "react";
import "./components.css";

const PermissionAlert = () => {
  const requestMicrophonePermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // Microphone permission granted and audio stream obtained
    } catch (error) {
      // Handle the error (e.g., permission denied)
    }
  };
  const requestLocationPermission = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Position obtained
        },
        (error) => {
          // Handle the error (e.g., permission denied)
        }
      );
    } else {
      // Geolocation is not supported by this browser
    }
  };

  // ask for permission to use microphone and location

  const handleMicrophoneAccess = async () => {
    await requestMicrophonePermission();
  };

  const handleLocationAccess = () => {
    requestLocationPermission();
  };

  useEffect(() => {
    handleLocationAccess();
    handleMicrophoneAccess();
  }, []);

  return (
    <div className="card-permission">
      <button type="button" className="dismiss">
        ×
      </button>
      <div className="header">
        <div className="image-permission">
          <p>X</p>
        </div>
        <div className="content-permission">
          <span className="title-permission">Permission Requested</span>
          <p className="message-permission">
            For a quicker response and effortless input, please enable location
            and microphone permissions for this app.
          </p>
        </div>
        <div className="actions">
          <button type="button" className="reload-permission">
            Continue without
          </button>
        </div>
      </div>
    </div>
  );
};

export default PermissionAlert;
