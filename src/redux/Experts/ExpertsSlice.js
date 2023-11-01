import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'http://127.0.0.1:4000';

export const fetchExperts = createAsyncThunk(
  'experts/fetchExperts',
  async () => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw Error('Error fetching experts');
    }
  },
);

const initialState = {
  experts: [],
  loading: false,
  error: null,
};

const ExpertsSlice = createSlice({
  name: 'experts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExperts.pending, (state) => ({
        ...state,
        loading: true,
        error: null,
      }))
      .addCase(fetchExperts.fulfilled, (state, action) => {
        state.experts = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchExperts.rejected, (state) => {
        state.loading = false;
        state.error = 'Error fetching experts';
      });
  },
});

export default ExpertsSlice.reducer;
