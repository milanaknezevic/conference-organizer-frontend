import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllKonferencije,
  deleteKonferenciju,
} from "../../services/organizator.service";

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
  initialState: {
    konferencije: [],
    izabrana: {},
    loading: false,
    error: null,
  },
  reducers: {
    izabranaKonferencija: (state, action) => {
      state.izabrana = action.payload; // ili state.izabrana = action.payload ako želite referencirati isti objekt

      console.log("Payload izabranaKonferencija:", action.payload);
    },
  },
  extraReducers: {
    [fetchKonferecnije.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchKonferecnije.fulfilled]: (state, action) => {
      state.konferencije = action.payload;

      state.loading = false;
      state.error = null;
    },
    [fetchKonferecnije.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [obrisiKonferenciju.pending]: (state, action) => {
      state.loading = true;
    },
    [obrisiKonferenciju.fulfilled]: (state, action) => {
      state.konferencije = action.payload;
      state.error = null;

      state.loading = false;
    },
    [obrisiKonferenciju.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export const { izabranaKonferencija } = organizatorSlice.actions;
export default organizatorSlice.reducer;
