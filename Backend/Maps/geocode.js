async function geocodeAddress(address) {
  const dotenv = require("dotenv");
  dotenv.config();

  const GOOGLE_MAPS_API = process.env.GOOGLE_MAPS_API_KEY;

  const fetch = (await import("node-fetch")).default;
  const urlAddress = encodeURIComponent(address);
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${urlAddress}&key=${GOOGLE_MAPS_API}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === "OK") {
      const { lat, lng } = data.results[0].geometry.location;

      return lat, lng;
    } else {
      lat = NaN;
      lng = NaN;
      return lat, lng;
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

const address = "University of Alberta, Edmonton, Canada";
(lat, lng) = geocodeAddress(address);

module.exports = {geocodeAddress};
