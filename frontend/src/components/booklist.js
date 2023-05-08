import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import Book from "./book";

const displayBook = {
  title: "DSA",
  author: "Niraj Singh",
  publisher: "Penguin & Co.",
  category: "Computer",
  quantity: 69,
};

function BookList() {
  return (
    <Box>
      <Book abook={displayBook} />
      <Book abook={displayBook} />
      <Book abook={displayBook} />
      <Book abook={displayBook} />
      <Book abook={displayBook} />
      <Book abook={displayBook} />
    </Box>
  );
}

export default BookList;
