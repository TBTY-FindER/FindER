import React from "react";

const Caption = ({ caption }) => {
  return (
    <div class="card-caption">
      <div class="card-image-caption">
        <h1>Click to speak to an assistant</h1>
      </div>
      <div class="card-description-caption">
        <p class="text-title-caption"> Caption</p>
        <p class="text-body-caption">{caption}</p>
      </div>
    </div>
  );
};

export default Caption;
