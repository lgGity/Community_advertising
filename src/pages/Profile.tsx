import React from 'react';
import { Avatar, Button, Container, Grid, IconButton, TextField, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

function ProfilePage() {

    
  const userData = {
    name: 'דוגמה',
    id: '123456789',
    email: 'example@example.com',
    phone: '123-456-7890'
  };

  const handleChangePassword = () => {
    // הוספת הפעולה שתשנה סיסמה
    console.log('Changing password...');
  };

  return (
    <Container maxWidth="md">
      <Grid container spacing={5} alignItems="center" justifyContent="center">
        <Grid item>
          <Avatar />
        </Grid>
      </Grid>
      <Grid container spacing={5} alignItems="center" justifyContent="center">
        <Grid item>
          <Typography variant="h5">{userData.name}</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={7} alignItems="center" justifyContent="center">
        <Grid item container alignItems="center"  md={12}>
          <TextField
            id="id"
            label="תעודת זהות"
            defaultValue={userData.id}
            InputProps={{
              readOnly: true,
            }}
          />
            <IconButton>
              <EditIcon />
            </IconButton>
        </Grid>
        <Grid item  md={12}>
          <TextField
            id="email"
            label="אימייל"
            defaultValue={userData.email}
            InputProps={{
              readOnly: true,
            }}
          />
          <IconButton>
            <EditIcon />
          </IconButton>
        </Grid>
        <Grid item md={12}>
          <TextField
            id="phone"
            label="טלפון"
            defaultValue={userData.phone}
            InputProps={{
              readOnly: true,
            }}
          />
          <IconButton>
            <EditIcon />
          </IconButton>
        </Grid>
        <Grid item md={12}>
          <TextField
            id="password"
            label="סיסמה"
            type="password"
            
          />
          <IconButton onClick={handleChangePassword}>
            <EditIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProfilePage;
