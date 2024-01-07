import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import HospitalList from '../components/HospitalListItem';

// const dummyHospitals = [
//   {
//     id: 1,
//     name: "City Hospital",
//     location: "123 Main St, Metropolis",
//     estimatedTime: "15 mins",
//     contact: "123-456-7890"
//   },
//   {
//     id: 2,
//     name: "Green Valley Clinic",
//     location: "456 Elm St, Smallville",
//     estimatedTime: "10 mins",
//     contact: "987-654-3210"
//   },
//   // Add more hospitals as needed
// ];



  // Using dummy data for now
  // useEffect(() => {
  //   setHospitals(dummyHospitals);
  // }, []);

function SecondPage() {
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/hospitals')
      .then(response => response.json())
      .then(data => setHospitals(data.body))
      .catch(error => console.error('Error fetching hospitals:', error));
  }, []);

  return (
    <div style={{
      width: '100%',
      height: '100vh',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: '40px 20px',
      background: 'linear-gradient(to right, #e3f2fd, #bbdefb)',
    }}>
      <Typography variant="h2" component="h1" style={{
        textAlign: 'center',
        margin: '40px 0', // Increased top and bottom margin
        width: '100%',
        // Removed the maxWidth restriction to allow the title to be as wide as the content
      }}>
        Nearby Hospitals
      </Typography>
      <HospitalList hospitals={hospitals} />
    </div>
  );
}

export default SecondPage;
