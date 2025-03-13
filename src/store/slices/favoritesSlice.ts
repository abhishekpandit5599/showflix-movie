import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Show } from '../../lib/types';

interface FavoritesState {
  items: Show[];
}

// Initial state is empty, persistence will be handled by redux-persist
const initialState: FavoritesState = {
  items: []
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Show>) => {
      // Prevent duplicates by checking if the show is already in favorites
      const exists = state.items.some(show => show.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(show => show.id !== action.payload);
    }
  }
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;
