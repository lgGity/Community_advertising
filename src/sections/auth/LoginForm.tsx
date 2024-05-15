import React, { useState } from 'react';
import { Typography, TextField, Button, Container, Grid, Paper, FormControlLabel, Checkbox } from '@mui/material'; 
import { useForm, SubmitHandler } from 'react-hook-form';
import { User } from '../../types/user.types'
import { login } from '../../services/user.service'
import { NavLink } from 'react-router-dom';
import { Email } from '@mui/icons-material';
import axios from '../../utils/axios';
import { isValidEmail, isValidPassword } from '../../api/user/userApi';
import { useAppDispatch } from '../../redux/store';
import {setUser} from '../../redux/auth/auth.slice'
import { setSession } from '../../auth/auth.utils';

interface FormData {
  email: string;
  password: string;
}

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [showPassword, setShowPassword] = React.useState(false);
  // const [validEmail,setValidEmail]= React.useState(true);
  const [userData, setUserData] = useState({
    email: '',
    password: ''
})
const dispatch = useAppDispatch()


  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log(data);
    if (isValid(data))
      handleLogin(data.email, data.password)
    else {
      console.log('email is not valid')
    }
  };
  const isValid = (params: FormData) => {
    // setValidEmail(isValidEmail(params.email))
    // console.log(validEmail)
    return isValidEmail(params.email);
  }

 const handleLogin = async (email: string, password: string) => {
    try {
      const authUser = await login(email, password)
      console.log(authUser)
      dispatch(setUser(authUser.user))
      setSession(authUser)
      // localStorage.setItem('token', token)
      // axios.defaults.headers['Authorization'] = `Bearer Token ${token}`
    } catch (error) {
      console.log('didnt get token '+error)
    }
  }
  return (
    <Container maxWidth="sm">
      <Paper style={{ padding: 20 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Log In
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                required
                {...register("email")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                fullWidth
                required
                {...register("password")}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox checked={showPassword} onChange={() => setShowPassword(!showPassword)} name="showPassword" />}
                label="Show Password"
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Sign In
              </Button>
            </Grid>
          </Grid>
        </form>
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component={NavLink} to="/home/sign" style={{ textAlign: 'center' }} color="primary">
            עדיין לא רשומים? הרשמו
          </Typography >
          <Typography component={NavLink} to=" " style={{ textAlign: 'center' }} color="primary">
            שכחת סיסמא
          </Typography >
        </div>
      </Paper >
    </Container >
  );
};
 
export default Login
