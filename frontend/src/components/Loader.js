import React from "react";

const Loader = () => {
  return (
    <div id="container">
      <label class="loading-title">Checking for permission...</label>
      <span class="loading-circle sp1">
        <span class="loading-circle sp2">
          <span class="loading-circle sp3"></span>
        </span>
      </span>
    </div>
  );
};

export default Loader;
