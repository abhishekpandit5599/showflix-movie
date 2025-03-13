import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Show, ShowSearchResult, ShowWithEmbedded } from '../../lib/types';
import { apiRequest } from '../../lib/queryClient';

interface ShowsState {
  items: Show[];
  filteredItems: Show[];
  selectedShow: ShowWithEmbedded | null;
  searchQuery: string;
  loading: boolean;
  detailsLoading: boolean;
  error: string | null;
}

const initialState: ShowsState = {
  items: [],
  filteredItems: [],
  selectedShow: null,
  searchQuery: '',
  loading: false,
  detailsLoading: false,
  error: null
};

export const fetchShows = createAsyncThunk(
  'shows/fetchShows',
  async (query: string = 'all') => {
    const response = await apiRequest('GET', `https://api.tvmaze.com/search/shows?q=${query}`);
    const data: ShowSearchResult[] = await response.json();
    return data.map(item => item.show);
  }
);

export const fetchShowDetails = createAsyncThunk(
  'shows/fetchShowDetails',
  async (id: number) => {
    const response = await apiRequest('GET', `https://api.tvmaze.com/shows/${id}?embed[]=cast&embed[]=seasons`);
    const data: ShowWithEmbedded = await response.json();
    return data;
  }
);

export const showsSlice = createSlice({
  name: 'shows',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      if (action.payload) {
        state.filteredItems = state.items.filter(show => {
          const query = action.payload.toLowerCase();
          const nameMatch = show.name.toLowerCase().includes(query);
          const genreMatch = show.genres && show.genres.some(genre => genre.toLowerCase().includes(query));
          const summaryMatch = show.summary && stripHtml(show.summary).toLowerCase().includes(query);
          return nameMatch || genreMatch || summaryMatch;
        });
      } else {
        state.filteredItems = state.items;
      }
    },
    clearSelectedShow: (state) => {
      state.selectedShow = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchShows.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShows.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.filteredItems = action.payload;
      })
      .addCase(fetchShows.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch shows';
      })
      .addCase(fetchShowDetails.pending, (state) => {
        state.detailsLoading = true;
        state.error = null;
      })
      .addCase(fetchShowDetails.fulfilled, (state, action) => {
        state.detailsLoading = false;
        state.selectedShow = action.payload;
      })
      .addCase(fetchShowDetails.rejected, (state, action) => {
        state.detailsLoading = false;
        state.error = action.error.message || 'Failed to fetch show details';
      });
  }
});

// Helper function to strip HTML tags
function stripHtml(html: string): string {
  return html.replace(/<\/?[^>]+(>|$)/g, "");
}

export const { setSearchQuery, clearSelectedShow } = showsSlice.actions;

export default showsSlice.reducer;
