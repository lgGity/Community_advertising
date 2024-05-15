import React, { useEffect } from 'react';
import { Typography, TextField, Button, Container, Grid, Paper, FormControlLabel, Checkbox } from '@mui/material'; import { useForm, SubmitHandler } from 'react-hook-form';
import { User } from '../../types/user.types'
import { addUser as addUserApi } from '../../services/user.service'
import { NavLink } from 'react-router-dom';
import { red } from '@mui/material/colors';
import { isValidID, isValidEmail, isValidPhoneNumber, isValidPassword } from '../../api/user/userApi'
import {setUser} from '../../redux/auth/auth.slice'
import { useAppDispatch } from '../../redux/store'
import { setSession } from '../../auth/auth.utils';

interface FormData {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string
}


const SignIn = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [showPassword, setShowPassword] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  //id-email-phone-password
  const validation = [true, true, true, true]
  const [valid,setValid]=React.useState(true);
  useEffect(() => {
    if (!valid) {
      console.log('validation issues')
    }
  }, [valid]);

   const CheckValidation = (params: FormData) => {
    validation[0] = isValidID(params.id)
    validation[1] = isValidEmail(params.email)
    validation[2] = isValidPhoneNumber(params.phone)
    validation[3] = isValidPassword(params.password, params.confirmPassword)
    console.log(validation)
    const isValid = !validation.some(element => !element);
    console.log(isValid);
    setValid(isValid);
    return isValid;
  }
  const dispatch = useAppDispatch()
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log(data);
    const newU = {
      id: data.id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password
    }
    if (CheckValidation(data)) {
      try {
        const newUser = await addUserApi(newU)
        dispatch(setUser(newUser))
        setSession(newUser)
        console.log(newUser)
      }
      catch (error) {
        console.log('cant add the user: ' + error)
      }
    };
  }

  return (
    <Container maxWidth="sm">
      <Paper style={{ padding: 20 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Sign In
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Id"
                variant="outlined"
                fullWidth
                required
                {...register("id")}
              />
              {validation[0] ? (
                <></>) : (<><h3 style={{ color: 'red' }}>ת"ז לא תקינה</h3></>)}
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                required
                {...register("name")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                required
                {...register("email")}
              />
              {validation[1] ? (
                <></>) : (<><Typography color={red}>מייל לא תקין</Typography></>)}
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Phone"
                variant="outlined"
                fullWidth
                required
                {...register("phone")}
              />
              {validation[2] ? (
                <></>) : (<><Typography color={red}>פלאפון לא תקין</Typography></>)}
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
              <TextField
                label="Confirm Password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                fullWidth
                required
                {...register("confirmPassword")}
              />
              {validation[3] ? (
                <></>) : (<><Typography color={red}>הסיסמאות אינן תואמות</Typography></>)}
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
        <div style={{ textAlign: 'center' }}>
          <Typography component={NavLink} to="/home/login" style={{ textAlign: 'center' }} color="primary">
            רשומים כבר? להתחברות
          </Typography >
        </div>
        {success ? (
          <>
            <h3>The user has successfully registered</h3>
          </>
        ) : (
          <></>
        )
        }
      </Paper >
    </Container >
  );
};

export default SignIn;
