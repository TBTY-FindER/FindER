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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <g strokeWidth="0" id="SVGRepo_bgCarrier"></g>
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              id="SVGRepo_tracerCarrier"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="1.5"
                stroke="#000000"
                d="M20 7L9.00004 18L3.99994 13"
              ></path>{" "}
            </g>
          </svg>
        </div>
        <div className="content-permission">
          <span className="title-permission">Permission Requested</span>
          <p className="message-permission">
            For a quicker response and effortless input, please enable location
            and microphone permissions for this app.
          </p>
        </div>
        <div className="actions">
          <button type="button" className="reload">
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default PermissionAlert;
