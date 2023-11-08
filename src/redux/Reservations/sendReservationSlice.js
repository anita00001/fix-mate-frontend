import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import baseURL from '../apiConfig';

export const postReservationDetails = createAsyncThunk('postreservation/', async (reservation) => {
  try {
    const response = await axios.post(`${baseURL}api/v1/reservations`, {
      user_id: reservation.user_id,
      expert_id: reservation.expert_id,
      city: reservation.city,
      date: reservation.date,
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to create');
  }
});

const postReservationSlice = createSlice({
  name: 'postreservation',
  initialState: {
    postReservationData: null,
    loading1: false,
    error1: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(postReservationDetails.pending, (state) => ({
        ...state,
        loading1: true,
        error1: null,
      }))
      .addCase(postReservationDetails.fulfilled, (state, action) => ({
        ...state,
        loading1: false,
        postReservationData: action.payload,
      }))
      .addCase(postReservationDetails.rejected, (state, action) => ({
        ...state,
        loading1: false,
        error1: action.error.message,
      }));
  },
});

export default postReservationSlice.reducer;
