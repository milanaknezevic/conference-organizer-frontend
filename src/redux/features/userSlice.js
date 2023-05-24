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

export const registrujSe = createAsyncThunk(
  "korisnici/logout",
  async (data) => {
    try {
      const response = await userService.registerUser(data);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const odjaviSe = (ulogovan) => {
  userService.odjaviKorisnika();
  return { type: "korisnici/odjava", ulogovan: ulogovan };
};

const userSlice = createSlice({
  name: "login",
  initialState: {
    ulogovan: false,
    user: null,
  },
  reducers: {
    odjavi: (state) => {
      state.ulogovan = false;
      state.user = null;
    },
  },
  extraReducers: {
    [ulogujSe.pending]: (state, action) => {
      state.loading = true;
    },
    [ulogujSe.fulfilled]: (state, action) => {
      state.loading = false;
      state.ulogovan = true;
      state.user = action.payload;
      state.error = null;
    },
    [ulogujSe.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [registrujSe.pending]: (state, action) => {
      state.loading = true;
    },

    [registrujSe.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    },
    [registrujSe.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export const { odjavi } = userSlice.actions;
export default userSlice.reducer;