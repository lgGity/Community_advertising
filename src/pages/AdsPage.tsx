import { getAllAds, getAdsByCategory as getAdsByCategoryApi } from '../services/ad.service'
import { getCategories as getCategoriesApi } from '../services/category.service'
import { getCategories } from '../redux/category/category.slice'
import { KeyboardEvent, ChangeEvent, useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAd } from '../redux/ad/ad.selectors'
import AdCards from '../components/adCards'
import { Ad } from '../types/ad.types';
import { Button, Grid, Menu, MenuItem, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import React from 'react';
import { selectCategory } from '../redux/category/category.selectors';
import { addAd, setAds } from '../redux/ad/ad.slice'
import MyAds from './MyAds';



export default function Board() {
    const ads = useSelector(selectAd)
    const dispatch = useDispatch()
    const category = useSelector(selectCategory)
    // useEffect(() => {
    //     getAdsByCategoryClick()
    //     //navigate('/board')
    // }, [chosenCategory])

    const getAdsByCategoryClick = async (id:number) => {
        // const id = chosenCategory
        console.log(id)
        const ads = await getAdsByCategoryApi(id);
        dispatch(setAds(ads))
    }
    return (<>
        {/* <Grid item xs={12} md={6}>
            <div className="subDropdown ContainerdivClass R">
                <Typography>מחפשי עבודה</Typography>
            </div>
            {/* נשאר מהרשימה */}
        {/* </Grid> */} 
        <div style={{
            position: 'fixed',
            top: '15%',
            right: 0,
            width: 'auto',
            transform: 'translateY(-50%)',
            display: 'flex',
            flexDirection: 'row-reverse',
            alignItems: 'flex-end',
            gap: '10px',
        }}>
            {category.map((p, i) => <Button onClick={async () => getAdsByCategoryClick(p.id)} style={{
                textAlign: 'center',
                marginBottom: '10px',
                direction: 'rtl',


            }} color="inherit">
                {p.name}
            </Button >
            )}
        </div >
        <AdCards adss={ads}/>
    </>
    );
}

