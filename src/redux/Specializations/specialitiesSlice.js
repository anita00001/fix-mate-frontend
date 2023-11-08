import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import baseURL from '../apiConfig';

export const fetchSpecializations = createAsyncThunk(
  'specializations/fetchSpecializations',
  async () => {
    try {
      const response = await axios.get(`${baseURL}api/v1/specializations`);
      return response.data;
    } catch (error) {
      throw Error('Error fetching specializations');
    }
  },
);

export const specialDetails = createAsyncThunk('specialization/', async (description) => {
  try {
    const response = await axios.post(`${baseURL}api/v1/specializations`, {
      name: description.name,
      description: description.description,
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to create');
  }
});

const specialitiesSlice = createSlice({
  name: 'specialization',
  initialState: {
    specializations: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(specialDetails.pending, (state) => ({
        ...state,
        loading: true,
        error: null,
      }))
      .addCase(specialDetails.fulfilled, (state, action) => {
        state.specializations = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(specialDetails.rejected, (state, action) => ({
        ...state,
        loading: false,
        error: action.error.message,
      }))
      .addCase(fetchSpecializations.pending, (state) => ({
        ...state,
        loading: true,
        error: null,
      }))
      .addCase(fetchSpecializations.fulfilled, (state, action) => {
        state.specializations = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchSpecializations.rejected, (state, action) => ({
        ...state,
        loading: false,
        error: action.error.message,
      }));
  },
});

export default specialitiesSlice.reducer;
