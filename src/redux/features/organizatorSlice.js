import {
  getAllKonferencije,
  deleteKonferenciju,
} from "../../services/organizator.service";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchKonferecnije = createAsyncThunk(
  "organizator/konferencije",
  async (token) => {
    const response = await getAllKonferencije(token);
    return response;
  }
);
export const obrisiKonferenciju = createAsyncThunk(
  "organizator/obrisiKonferenciju",
  async ({ token, idKonferencije }) => {
    console.log("idKonferencije pri pozivu metoda", idKonferencije);
    const response = await deleteKonferenciju(token, idKonferencije);
    return response;
  }
);

const organizatorSlice = createSlice({
  name: "organizator",
  initialState: [],
  reducers: {},

  extraReducers: {
    [fetchKonferecnije.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [fetchKonferecnije.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      return action.payload;
    },
    [fetchKonferecnije.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },

    [obrisiKonferenciju.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [obrisiKonferenciju.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      return action.payload;
    },
    [obrisiKonferenciju.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export default organizatorSlice.reducer;
