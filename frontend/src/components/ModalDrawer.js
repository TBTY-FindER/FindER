import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

function UserDrawer({ isOpen, userInformation }) {
  return (
    <Drawer anchor="left" open={isOpen} variant="persistent">
      <List>
        {Object.entries(userInformation).map(([key, value]) => (
          <ListItem button key={key}>
            <ListItemText primary={`${key}: ${value}`} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default UserDrawer;
