import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllKonferencijeZaPosjetioca,
  addOcjenu,
  addPosjetioca,
  filtrirajKonferencijePosjetilac,
  deletePosjetioca,
} from "../../services/posjetilac.service";

export const fetchKonferecnijePosjetioca = createAsyncThunk(
  "posjetilac/konferencije",
  async ({ token, idPosjetioca }) => {
    const response = await getAllKonferencijeZaPosjetioca(token, idPosjetioca);
    return response;
  }
);

export const fetchFilterKonferencijePosjetioca = createAsyncThunk(
  "konferencije/posjetilac/filter",
  async ({ token, idPosjetioca, data }) => {
    const response = await filtrirajKonferencijePosjetilac(
      token,
      idPosjetioca,
      data
    );
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
export const dodajPosjetioca = createAsyncThunk(
  "posjetilac/add_posjetioca",
  async ({ token, posjetilac }) => {
    const response = await addPosjetioca(token, posjetilac);
    const responseData = {
      status: response.status,
      ok: response.ok,
      // Dodajte druge relevantne podatke iz odgovora
    };
    return responseData;
  }
);
export const obrisiPosjetioca = createAsyncThunk(
  "posjetilac/obrisiPosjetioca",
  async ({ token, korisnikId, dogadjajId }) => {
    const response = await deletePosjetioca(token, korisnikId, dogadjajId);
    const responseData = {
      status: response.status,
      ok: response.ok,
      // Dodajte druge relevantne podatke iz odgovora
    };
    return responseData;
  }
);
/*export const dodajPosjetioca = createAsyncThunk(
  "organizator/add_posjetioca",
  async ({ token, posjetilac }) => {
    console.log("posjetioc iz slice", posjetilac);
    const response = await addPosjetioca(token, posjetilac);
    return response;
  }
);*/

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
    [dodajPosjetioca.pending]: (state, action) => {
      state.loading = true;
    },
    [dodajPosjetioca.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
    },
    [dodajPosjetioca.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [fetchFilterKonferencijePosjetioca.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchFilterKonferencijePosjetioca.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.konferencijePosjetioca = action.payload;
    },
    [fetchFilterKonferencijePosjetioca.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [obrisiPosjetioca.pending]: (state, action) => {
      state.loading = true;
    },
    [obrisiPosjetioca.fulfilled]: (state, action) => {
      /*const deletedKonferencija = action.payload;
      state.konferencije = state.konferencije.filter(
        (konferencija) => konferencija.id !== deletedKonferencija.id
      );*/
      state.error = null;
      state.loading = false;
    },
    [obrisiPosjetioca.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export const { setKonferencijePosjetioca } = posjetilacSlice.actions;
export default posjetilacSlice.reducer;
