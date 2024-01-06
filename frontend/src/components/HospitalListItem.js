import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function HospitalList({ hospitals }) {
  const cardStyle = {
    maxWidth: 345,
    borderRadius: '15px', // Rounded corners
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', // Optional: adds a shadow effect
    transition: '0.3s', // Smooth transition for hover effect
  };

  const onCardHover = {
    transform: 'scale(1.05)', // Slightly enlarge the card on hover
    boxShadow: '0 8px 16px 0 rgba(0,0,0,0.3)', // Optional: increase shadow on hover
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px' }}>
      {hospitals.map((hospital, index) => (
        <Card key={index} variant="outlined" style={cardStyle}
              onMouseOver={e => e.currentTarget.style = {...cardStyle, ...onCardHover}}
              onMouseOut={e => e.currentTarget.style = cardStyle}>
          <CardContent>
            <Typography variant="h5" component="div">
              {hospital.name}
            </Typography>
            <Typography variant="body2">
              Distance: {hospital.distance} km
              <br />
              Estimated Time to Arrival: {hospital.time} mins
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default HospitalList;
