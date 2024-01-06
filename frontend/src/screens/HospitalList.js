import React, { useState, useEffect } from 'react';
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
    <div style={{ width: '100vw', height: '100vh', overflow: 'auto', padding: '20px' }}>
      <h1>Nearby Hospitals</h1>
      <HospitalList hospitals={hospitals} />
    </div>
  );
}

export default SecondPage;
