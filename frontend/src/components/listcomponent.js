import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import { useEffect, useState } from 'react';

function ListComponent(props){
        const navigate = useNavigate();

        function handleClick() {
            navigate("/student/book/" + props._id);
        }

        const [availability, setAvailability] = useState({
            isAvailable: "Available",
            colour: "#4caf50"
        });

        useEffect(() => {
            if(!props.quantity)
            {
                setAvailability({
                    isAvailable: "Not Available",
                    colour: "#f44336"
                })
            }
        });


    return(
            <Card sx={{ width: 320 , borderRadius:4}} style={{display: "inline-block", margin: "10px", backgroundColor: "#a2d2ff"}}>
                <CardActionArea onClick={() => handleClick()}>
                    <CardMedia
                    component="img"
                    height="200"
                    image="https://propertywiselaunceston.com.au/wp-content/themes/property-wise/images/no-image.png"
                    alt="green iguana"
                    />
                    <CardContent style={{textAlign: "center"}}>
                        <Typography gutterBottom variant="body1" component="div">
                            {props.title}
                        </Typography>
                        <hr></hr>
                        <Typography variant="body2" color="text.secondary">
                            By - {props.author}
                        </Typography>
                        <hr></hr>
                        <Typography variant="body2" color="text.secondary">
                            Publisher - {props.publisher}
                        </Typography>
                        <hr></hr>
                        <Typography variant="body2" color="text.secondary">
                            Category - {props.category}
                        </Typography>
                        <hr></hr>
                        <Typography varient="body2" color={availability.colour}>{availability.isAvailable}</Typography>
                    </CardContent>
                </CardActionArea>
            </Card> 
    );
}

export default ListComponent;