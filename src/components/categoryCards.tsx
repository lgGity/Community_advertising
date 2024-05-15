import React from 'react';
import { Card, CardActionArea, CardContent, Button, Typography, CardMedia } from '@mui/material';
import { Category } from '../types/category.type'
// import img1 from "../image/img.png"
//import img1 from "../../public/תמונות/שכירות.jpeg"
import img1 from "../image/שכירות.jpeg"
import img2 from "../image/קניה.jpeg"
import img3 from "../image/שכירות2.jpeg"
import img4 from "../image/עסקים2.jpeg"
import img5 from "../image/דרושים-1.jpg"
import img6 from "../image/קיץ ונופש.jpg"
import img7 from "../image/רכב.jpg"
import img8 from "../image/נדלן4.jpeg"
import img9 from "../image/יד שניה.jpeg"
import img10 from "../image/גמח (2).jpg"

// import img2 from "../../public/תמונות/קניה.jpeg"
// import img3 from "../../public/תמונות/שכירות2.jpeg"
// import img4 from "../../public/תמונות/עסקים2.jpeg"
// import img5 from "../../public/תמונות/דרושים-1.jpg"
// import img6 from "../../public/תמונות/קיץ ונופש.jpg"
// import img7 from "../../public/תמונות/רכב.jpg"
// import img8 from "../../public/תמונות/נדלן4.jpeg"
// import img9 from "../../public/תמונות/יד שניה.jpeg"
// import img10 from "../../public/תמונות/גמח (2).jpg"
import { NavLink } from 'react-router-dom';



type CategoryProps = {
    category: Category,
    onClick: () => {},
    img: number
}

const CategoryButton = ({ category, onClick, img }: CategoryProps) => {
    const imgs = [img1, img3, img7, img4, img5, img6, img7, img8, img9, img10]
    return (

        <Card sx={{ maxWidth: 345, margin: '20px', display: 'inline-block' }}>
            <CardActionArea onClick={onClick}>
                    <CardMedia
                        component="img"
                        height="140"
                        image={imgs[category.id-1]}
                        // image={imgs[img]}// Assuming ad.image contains the URL of the image
                        alt={category.name}
                    />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {category.name}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default CategoryButton;
