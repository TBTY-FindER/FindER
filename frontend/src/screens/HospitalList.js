import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import HospitalList from "../components/HospitalListItem";
import Sidebar from "../components/Sidebar";

function SecondPage({ address, gender, age, situation }) {
  
  const [hospitals, setHospitals] = useState([]);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/api/hospitals")
      .then((response) => response.json())
      .then((data) => setHospitals(data.body))
      .catch((error) => console.error("Error fetching hospitals:", error));
  }, []);

  const toggleIconStyle = {
    position: 'fixed',
    left: sidebarVisible ? '300px' : '0', // Position next to the sidebar
    top: '50%',
    zIndex: '2',
    cursor: 'pointer',
    transform: 'translateY(-50%)',
    // Add more styles as needed
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div style={{
      width: '100%',
      height: '100vh', // Fixed height of the whole page
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      background: 'linear-gradient(to right, #e3f2fd, #bbdefb)',
    }}>
      <Typography variant="h2" component="h1" style={{
        textAlign: 'center',
        margin: '40px 0',
        width: '100%',
        maxWidth: '800px',
        fontSize: '2.5rem', // Smaller font size for the header
      }}>
        Nearby Hospitals
      </Typography>
      <div style={toggleIconStyle} onClick={toggleSidebar}>
        {sidebarVisible ? '←' : '→'} {/* Arrow changes direction based on sidebar state */}
      </div>
      <HospitalList hospitals={hospitals} />
      <Sidebar
        isVisible={sidebarVisible}
        closeSidebar={toggleSidebar}
        address={address}
        gender={gender}
        situation={situation}
        age={age}
      />
    </div>
  );
}

export default SecondPage;
