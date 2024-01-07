import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import HospitalList from "../components/HospitalListItem";
import HospitalDetailsModal from "../components/HospitalDetailsModal";
import Sidebar from "../components/Sidebar";
import IconButton from "@mui/material/IconButton";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

function SecondPage({ address, gender, age, situation, response }) {
  const [hospitals, setHospitals] = useState([]);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // useEffect(() => {
  //   fetch("http://localhost:3000/api/hospitals")
  //     .then((response) => response.json())
  //     .then((data) => setHospitals(data.body))
  //     .catch((error) => console.error("Error fetching hospitals:", error));
  // }, []);

  const toggleIconStyle = {
    position: "fixed",
    left: sidebarVisible ? "300px" : "0", // Position next to the sidebar
    top: "50%",
    zIndex: "2",
    cursor: "pointer",
    transform: "translateY(-50%)",
    // Add more styles as needed
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleResubmit = (formData) => {
    console.log("Resubmitted data:", formData);
    // Handle the resubmitted data, e.g., send to an API or update state
  };

  const handleHospitalClick = (hospital) => {
    setSelectedHospital(hospital);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedHospital(null);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh", // Fixed height of the whole page
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <Typography
        variant="h2"
        component="h1"
        style={{
          textAlign: "center",
          margin: "40px 0",
          width: "100%",
          maxWidth: "800px",
          fontSize: "2.5rem", // Smaller font size for the header
        }}
      >
        Nearby Hospitals
      </Typography>
      <IconButton onClick={toggleSidebar} style={toggleIconStyle}>
        {sidebarVisible ? <ArrowBackIosIcon /> : <ArrowForwardIosIcon />}
      </IconButton>
      <HospitalList
        hospitals={response[1]}
        onHospitalClick={handleHospitalClick}
      />
      <Sidebar
        isVisible={sidebarVisible}
        address={address}
        gender={gender}
        age={age}
        situation={situation}
        onResubmit={handleResubmit}
      />
      {selectedHospital && (
        <HospitalDetailsModal
          open={isModalOpen}
          hospitalDetails={selectedHospital}
          onClose={handleCloseModal}
          urgent={response[2]}
        />
      )}
    </div>
  );
}

export default SecondPage;
