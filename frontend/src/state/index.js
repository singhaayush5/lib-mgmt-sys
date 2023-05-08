import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  books: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setUserBooks: (state, action) => {
      if (state.user) {
        state.user.borrowed = action.payload.borrowed;
      } else {
        console.error("user books non-existent :(");
      }
    },
    setBooks: (state, action) => {
      state.books = action.payload.books;
    },
  },
});

export const { setLogin, setLogout, setUserBooks, setBooks } =
  authSlice.actions;
export default authSlice.reducer;
