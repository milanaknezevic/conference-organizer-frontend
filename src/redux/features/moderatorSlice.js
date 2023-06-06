import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllKonferencijeZaModeratora } from "../../services/moderator.service";
import { filtrirajKonferencijeModerator } from "../../services/moderator.service";
export const fetchKonferecnijeModeratora = createAsyncThunk(
  "moderator/konferencije",
  async ({ token, idModeratora }) => {
    const response = await getAllKonferencijeZaModeratora(token, idModeratora);
    return response;
  }
);
export const fetchFilterKonferencijeModeratora = createAsyncThunk(
  "konferencije/moderator/filter",
  async ({ token, idModeratora, data }) => {
    const response = await filtrirajKonferencijeModerator(
      token,
      idModeratora,
      data
    );
    return response;
  }
);

const moderatorSlice = createSlice({
  name: "moderator",
  initialState: {
    konferencijeModeratora: [],
    loading: false,
    error: null,
  },
  reducers: {
    setKonferencijeModeratora(state, action) {
      state.konferencijeModeratora = action.payload;
    },
  },
  extraReducers: {
    [fetchKonferecnijeModeratora.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchKonferecnijeModeratora.fulfilled]: (state, action) => {
      state.konferencijeModeratora = action.payload;

      state.loading = false;
      state.error = null;
    },
    [fetchKonferecnijeModeratora.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [fetchFilterKonferencijeModeratora.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchFilterKonferencijeModeratora.fulfilled]: (state, action) => {
      state.konferencijeModeratora = action.payload;

      state.loading = false;
      state.error = null;
    },
    [fetchFilterKonferencijeModeratora.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export const { setKonferencijeModeratora } = moderatorSlice.actions;
export default moderatorSlice.reducer;
