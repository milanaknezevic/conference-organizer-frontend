import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../../services/user.service";

export const ulogujSe = createAsyncThunk("korisnici/login", async (data) => {
  try {
    const response = await userService.login(data);
    return response;
  } catch (error) {
    throw error;
  }
});
const loginSlice = createSlice({
  name: "login",
  initialState: {},
  reducers: {},
  extraReducers: {
    [ulogujSe.pending]: (state, action) => {
      state.loading = true;
    },
    [ulogujSe.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
    },
    [ulogujSe.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export default loginSlice.reducer;
