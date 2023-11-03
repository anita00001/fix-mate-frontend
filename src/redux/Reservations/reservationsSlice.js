import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import baseURL from '../apiConfig';

export const fetchReservations = createAsyncThunk(
  'reservations/fetchReservations',
  async () => {
    try {
      const response = await axios.get(`${baseURL}api/v1/reservations`);
      return response.data;
    } catch (error) {
      throw Error('Error fetching Reservations');
    }
  },
);

const initialState = {
  reservations: [],
  loading: false,
  error: null,
};

const reservationsSlice = createSlice({
  name: 'reservations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReservations.pending, (state) => ({
        ...state,
        loading: true,
        error: null,
      }))
      .addCase(fetchReservations.fulfilled, (state, action) => {
        state.reservations = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchReservations.rejected, (state) => {
        state.loading = false;
        state.error = 'Error fetching experts';
      });
  },
});

export default reservationsSlice.reducer;
