import { createSlice } from "@reduxjs/toolkit";

type PokemonType = {
  id: string;
  name: string;
  sprite: string;
};

export type inventoryType = {
  pokemons: PokemonType[];
};

const inventoryInitState: inventoryType = {
  pokemons: [],
};

const inventorySlice = createSlice({
  name: "inventory",
  initialState: inventoryInitState,
  reducers: {
    catchPokemon(state, action) {
      state.pokemons.push(action.payload);
    },
  },
});

export const inventoryAction = inventorySlice.actions;

export default inventorySlice.reducer;
