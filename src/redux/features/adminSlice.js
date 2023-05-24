import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAktivni,
  getZahtjevi,
  getBlokirani,
} from "../../services/admin.services";

export const fetchKorisnici = createAsyncThunk(
  "korisnici/fetchKorisnici",
  async ({ token, userId, izbor }) => {
    if (izbor === "aktivni") {
      return getAktivni(token, userId);
    } else if (izbor === "zahtjevi") {
      return getZahtjevi(token, userId);
    } else if (izbor === "blokirani") {
      return getBlokirani(token, userId);
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    korisnici: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [fetchKorisnici.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [fetchKorisnici.fulfilled]: (state, action) => {
      state.loading = false;
      state.korisnici = action.payload;
      state.error = null;
    },
    [fetchKorisnici.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export default adminSlice.reducer;
