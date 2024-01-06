import React from "react";
import "./components.css";

const PermissionAlert = () => {
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
