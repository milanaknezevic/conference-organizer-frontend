import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllKonferencije,
  deleteKonferenciju,
  getModeratore,
  getLokacije,
  getTipoviDogadjaja,
  updateKonferenciju,
} from "../../services/organizator.service";

export const fetchKonferecnije = createAsyncThunk(
  "organizator/konferencije",
  async (token) => {
    const response = await getAllKonferencije(token);
    return response;
  }
);

export const azurirajKonferenciju = createAsyncThunk(
  "organizator/update_konferenciju",
  async ({ token, idKonferencije, konferencijaRequest }) => {
    const response = await updateKonferenciju(
      token,
      idKonferencije,
      konferencijaRequest
    );
    return response;
  }
);

export const fetchLokacije = createAsyncThunk(
  "organizator/lokacije",
  async (token) => {
    const response = await getLokacije(token);
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

export const fetchTipoviDogadjaja = createAsyncThunk(
  "organizator/tipovi_dogadjaja",
  async (token) => {
    const response = await getTipoviDogadjaja(token);
    return response;
  }
);

export const obrisiKonferenciju = createAsyncThunk(
  "organizator/obrisiKonferenciju",
  async ({ token, idKonferencije }) => {
    const response = await deleteKonferenciju(token, idKonferencije);
    return response;
  }
);

const organizatorSlice = createSlice({
  name: "organizator",
  initialState: {
    konferencije: [],
    lokacije: [],
    tipoviDogadjaja: [],
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
    setTipoviDogadjaja(state, action) {
      state.tipoviDogadjaja = action.payload;
    },
    izabranaKonferencija: (state, action) => {
      state.izabrana = action.payload; // ili state.izabrana = action.payload ako želite referencirati isti objekt
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
      state.lokacije = action.payload;

      state.loading = false;
      state.error = null;
    },
    [fetchLokacije.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },

    [fetchTipoviDogadjaja.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchTipoviDogadjaja.fulfilled]: (state, action) => {
      state.tipoviDogadjaja = action.payload;

      state.loading = false;
      state.error = null;
    },
    [fetchTipoviDogadjaja.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [azurirajKonferenciju.pending]: (state, action) => {
      state.loading = true;
    },
    [azurirajKonferenciju.fulfilled]: (state, action) => {
      console.log("action azurirajKonferenciju ", action.payload);
      state.loading = false;
      state.error = null;
    },
    [azurirajKonferenciju.rejected]: (state, action) => {
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
  setTipoviDogadjaja,
} = organizatorSlice.actions;
export default organizatorSlice.reducer;
