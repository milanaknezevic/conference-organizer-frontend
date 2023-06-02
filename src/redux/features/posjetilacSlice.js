import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllKonferencijeZaPosjetioca,
  addOcjenu,
} from "../../services/posjetilac.service";

export const fetchKonferecnijePosjetioca = createAsyncThunk(
  "posjetilac/konferencije",
  async ({ token, idPosjetioca }) => {
    const response = await getAllKonferencijeZaPosjetioca(token, idPosjetioca);
    return response;
  }
);

export const dodajOcjenu = createAsyncThunk(
  "posjetilac/add_ocjena",
  async ({ token, ocjenaRequest }) => {
    const response = await addOcjenu(token, ocjenaRequest);
    return response;
  }
);

const posjetilacSlice = createSlice({
  name: "posjetilac",
  initialState: {
    konferencijePosjetioca: [],
    loading: false,
    error: null,
  },
  reducers: {
    setKonferencijePosjetioca(state, action) {
      state.konferencijePosjetioca = action.payload;
    },
  },
  extraReducers: {
    [fetchKonferecnijePosjetioca.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchKonferecnijePosjetioca.fulfilled]: (state, action) => {
      state.konferencijePosjetioca = action.payload;

      state.loading = false;
      state.error = null;
    },
    [fetchKonferecnijePosjetioca.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },

    [dodajOcjenu.pending]: (state, action) => {
      state.loading = true;
    },
    [dodajOcjenu.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
    },
    [dodajOcjenu.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export const { setKonferencijePosjetioca } = posjetilacSlice.actions;
export default posjetilacSlice.reducer;
