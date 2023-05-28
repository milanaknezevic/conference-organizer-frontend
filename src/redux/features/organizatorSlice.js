import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllKonferencije,
  deleteKonferenciju,
  getModeratore,
  getLokacije,
} from "../../services/organizator.service";

export const fetchKonferecnije = createAsyncThunk(
  "organizator/konferencije",
  async (token) => {
    const response = await getAllKonferencije(token);
    return response;
  }
);

export const fetchLokacije = createAsyncThunk(
  "organizator/lokacije",
  async (token) => {
    const response = await getLokacije(token);
    console.log("response lokacije iz reduxa", response);
    return response;
  }
);

export const fetchModeratori = createAsyncThunk(
  "organizator/moderatori",
  async (token) => {
    const response = await getModeratore(token);
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
    lokacije: [],
    moderatori: [],
    izabrana: {},
    loading: false,
    error: null,
  },
  reducers: {
    setKonferencijeRedux(state, action) {
      state.konferencije = action.payload;
    },
    setModeratori(state, action) {
      state.moderatori = action.payload;
    },
    setLokacije(state, action) {
      state.lokacije = action.payload;
    },
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
      const deletedKonferencija = action.payload;
      state.konferencije = state.konferencije.filter(
        (konferencija) => konferencija.id !== deletedKonferencija.id
      );
      state.error = null;
      state.loading = false;
    },
    [obrisiKonferenciju.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [fetchModeratori.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchModeratori.fulfilled]: (state, action) => {
      state.moderatori = action.payload;

      state.loading = false;
      state.error = null;
    },
    [fetchModeratori.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },

    [fetchLokacije.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchLokacije.fulfilled]: (state, action) => {
      console.log("action payload", action.payload);
      state.lokacije = action.payload;

      state.loading = false;
      state.error = null;
    },
    [fetchLokacije.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export const {
  izabranaKonferencija,
  setKonferencijeRedux,
  setModeratori,
  setLokacije,
} = organizatorSlice.actions;
export default organizatorSlice.reducer;
