import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PokemonState {
  currentSearch: string;
}

const initialState: PokemonState = {
  currentSearch: "pikachu",
};

export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.currentSearch = action.payload;
    },
  },
});

export const { setSearch } = pokemonSlice.actions;
export default pokemonSlice.reducer;
