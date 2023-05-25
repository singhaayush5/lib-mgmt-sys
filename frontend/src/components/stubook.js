import { useEffect, useState } from "react";
import { Grid, Box, Typography } from "@mui/material";
import { Button } from "@mui/material";

function StuBook(){

    const [book, setBookData] = useState({});

    useEffect(() => {        
        const bookID = window.location.pathname.split("/").pop();
        fetch('http://localhost:3001/api/book/' + bookID)
        .then(data => {
        return data.json();
        })
        .then(book => {
            setBookData(book);
        });
    })

    return(
        <>
            <Grid container spacing={2} style={{marginTop: 50}}>
                <Grid xs={12} md={12} style={{textAlign: "center"}}>
                    <Box
                        style={{maxWidth: "100%"}}
                        width={300}
                        component="img"
                        alt="The house from the offer."
                        src="https://propertywiselaunceston.com.au/wp-content/themes/property-wise/images/no-image.png"
                    />
                </Grid>
                <Grid xs={12} md={12} style={{textAlign: "center"}}>
                    <Typography
                    m={2}
                    variant="h4"
                    fontWeight={"bold"}
                    >
                        {book.title}
                    </Typography>
                    <Typography variant="h5" color="text.secondary" m={2}>
                        By - {book.author}
                    </Typography>

                    <Typography variant="h5" color="text.secondary" m={2}>
                        Published by - {book.publisher}
                    </Typography>

                </Grid>
                <Grid xs={12} style={{textAlign: "center"}} item>
                <Button
                  sx={{ borderRadius: 6 }}
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={book.quantity?0:1}
                >
                  <Typography
                    variant="body1"
                    fontWeight={"bold"}
                    color={[book.quantity?"white":"error"]}
                    
                    >
                        {book.quantity?"Issue Book":"Not Available"}
                    </Typography>
                </Button>
              </Grid>
                
            </Grid>
        </>
    );
}

export default StuBook;