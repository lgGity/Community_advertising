import React, { useId, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Button, CircularProgress, Container, FormControl, FormControlLabel, FormLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectCategory } from '../redux/category/category.selectors';
import { addAd as addAdApi, defineCategory as defineCategoryApi } from '../services/ad.service';
import { selectAuth } from '../redux/auth/auth.selectors';
import { Ad } from '../types/ad.types';
import { addAd } from '../redux/ad/ad.slice';
import { useAppDispatch } from '../redux/store';

const AddAdvertisementPage = () => {
  const { register, handleSubmit, control, getValues } = useForm<FormData>();
  const category = useSelector(selectCategory)
  const user = useSelector(selectAuth)
  const [buttonsDisabled, setButtonsDisabled] = useState(true);
  const [chosenCategory, setChosenCategory] = useState<string>('')
  // const [loading, setLoading] = useState(false); // משתנה לניהול מצב הטעינה
  const dispatch = useAppDispatch()

  interface FormData {
    title: string;
    content: string;
    category: number;
  };

  const handleClick = async () => {
    //לשים לב ששלחנו User userIdב
    const newAd: Ad = {
      id: 0,
      title: getValues('title'),
      context: getValues('content'),
      categoryId: category[0].id,
      userId: user.user!.id,
      date: new Date()
    }
    console.log(newAd);
    const categoryId = await defineCategoryApi(newAd)
    setButtonsDisabled(false)
    const name = category.filter(c => c.id !== categoryId)[0]?.name || ''
    console.log(name)
    console.log(categoryId)
    setChosenCategory(category.filter(c => c.id !== categoryId)[0]?.name || '')
  }
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    // setLoading(true); // התחלת הטעינה
    console.log(data as FormData);
    const newAd = {
      id: 0,
      title: data.title,
      context: data.content,
      categoryId: data.category,
      userId: user.user!.id,
      date: new Date()
    }
    console.log(newAd);
    const res = await addAdApi(newAd)
    dispatch(addAd(newAd))
    // setLoading(false);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        הוספת מודעה חדשה
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl fullWidth margin="normal">
          <TextField
            {...register('title', { required: true })}
            label="כותרת"
            variant="outlined"
            fullWidth
            margin="normal"
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            {...register('content', { required: true })}
            label="תוכן המודעה"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            margin="normal"
            id='content'
          />
        </FormControl>
        <Button type="button" variant="contained" color="primary" onClick={handleClick}  >
          המשך
        </Button>
        <FormControl fullWidth margin="normal">
          <FormLabel>קטגוריה</FormLabel>
          {/* <Button type="button" variant="contained" color="primary" onClick={handleClick} disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "המשך"}
          </Button> */}
          <Select
            {...register('category', { required: true })}
            variant="outlined"
            fullWidth
            // margin="normal"
            defaultValue="{chosenCategory}"
            // control={control}
            disabled={buttonsDisabled}
          >
            {category.map((p, i) => (
              <MenuItem value={`${p.id}`} key={`${p.id}`}>
                {p.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary" fullWidth disabled={buttonsDisabled}>
          שלח מודעה
        </Button>
      </form>
    </Container>
  );
};

export default AddAdvertisementPage;
