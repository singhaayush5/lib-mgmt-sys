import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
} from "@mui/material";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NewBook() {
  const [book, setBook] = useState({
    title: "",
    author: "",
    publisher: "",
    category: "",
    quantity: 0,
  });

  const navigator = useNavigate();

  const handleChange = (eve) => {
    console.log(book);
    setBook({ ...book, [eve.target.name]: eve.target.value });
  };

  const postBookData = async (eve) => {
    eve.preventDefault();
    const { title, author, publisher, category, quantity } = book;
    console.log(book);

    const res = await fetch("/api/newbook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        author: author,
        publisher: publisher,
        category: category,
        quantity: quantity,
      }),
    });

    const resData = await res.json();
    if (resData.status === 400 || !resData || resData.error) {
      console.log("Failure!");
      console.log(resData);
    } else {
      console.log(resData);
      console.log("Success!");
    }
    navigator("/librarian/newbook");
  };

  return (
    <div>
      <Typography style={{ margin: "5% auto" }} variant="h3" align="Center">
        New Book
      </Typography>
      <Card style={{ maxWidth: 400, margin: "7% auto", padding: "20px 6px" }}>
        <CardContent>
          <form>
            <Grid container spacing={2}>
              <Grid xs={12} item>
                <TextField
                  size="small"
                  name="title"
                  value={book.title}
                  onChange={handleChange}
                  label="Title"
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              <Grid xs={12} item>
                <TextField
                  size="small"
                  name="author"
                  value={book.author}
                  onChange={handleChange}
                  label="Author"
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              <Grid xs={12} item>
                <TextField
                  size="small"
                  name="publisher"
                  value={book.publisher}
                  onChange={handleChange}
                  label="Publisher"
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              <Grid xs={12} sm={6} item>
                <FormControl name="category" fullWidth required>
                  <InputLabel id="select-category-label">Category</InputLabel>
                  <Select
                    size="small"
                    value={book.category}
                    name="category"
                    onChange={handleChange}
                    labelId="select-category-label"
                    label="category"
                  >
                    <MenuItem value={"Programming"}>Programming</MenuItem>
                    <MenuItem value={"Chemistry"}>Chemistry</MenuItem>
                    <MenuItem value={"Electrical Engineering"}>
                      Electrical Engineering
                    </MenuItem>
                    <MenuItem value={"Maths"}>Maths</MenuItem>
                    <MenuItem value={"Mechanical Engineering"}>
                      Mechanical Engineering
                    </MenuItem>
                    <MenuItem value={"Environment"}>Environment</MenuItem>
                    <MenuItem value={"Electronics And Communication"}>
                      Electronics And Communication
                    </MenuItem>
                    <MenuItem value={"Physics"}>Physics</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid xs={12} sm={6} item>
                <TextField
                  size="small"
                  name="quantity"
                  type="number"
                  value={book.quantity}
                  onChange={handleChange}
                  inputProps={{ min: 0 }}
                  label="Quantity"
                  placeholder="No. of books"
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              <Grid xs={12} item>
                <Button
                  sx={{ borderRadius: 6 }}
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={postBookData}
                  fullWidth
                >
                  Add Book
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default NewBook;
