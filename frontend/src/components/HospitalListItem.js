import React, { useState } from 'react';
import Grid from '@mui/material/Grid'; // Import Grid
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function HospitalList({ hospitals }) {
  const [hoveredCard, setHoveredCard] = useState(null);

  const cardStyle = {
    maxWidth: '100%', // Adjusted for full width
    borderRadius: '15px',
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    transition: '0.3s',
    margin: '0 auto', // Centering the card
  };

  const hoveredStyle = {
    ...cardStyle,
    transform: 'scale(1.05)',
    boxShadow: '0 8px 16px 0 rgba(0,0,0,0.3)',
  };

  return (
    <Grid container spacing={3} style={{ padding: '20px' }}> {/* Use Grid container here */}
      {hospitals.map((hospital, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}> {/* Grid item for each card */}
          <Card variant="outlined" style={hoveredCard === index ? hoveredStyle : cardStyle}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}>
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
        </Grid>
      ))}
    </Grid>
  );
}

export default HospitalList;
