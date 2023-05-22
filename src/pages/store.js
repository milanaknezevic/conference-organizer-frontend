//configuring store za redux
//reducer ima akciju i prethodno stanje
import { configureStore, createSlice } from "@reduxjs/toolkit";
//ovo sad treba u svaki fajl posebno but..
const initialState = {
  value: { username: "", id: "", token: "", ulogovan: false },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },
    logout: (state) => {
      state.value = { username: "", id: "", token: "", ulogovan: false };
    },
  },
});

export const { login, logout } = userSlice.actions;

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});
