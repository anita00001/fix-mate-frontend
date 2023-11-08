import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import baseURL from '../apiConfig';

export const queryExpertDetails = createAsyncThunk('query_experts/getexperts', async () => {
  try {
    const response = await axios.get(`${baseURL}api/v1/getexperts/data`);
    return response.data;
  } catch (error) {
    throw new Error('Querying experts records failed');
  }
});

const queryExpertsSlice = createSlice({
  name: 'query_experts',
  initialState: {
    expertData: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(queryExpertDetails.pending, (state) => ({
        ...state,
        loading: true,
        error: null,
      }))
      .addCase(queryExpertDetails.fulfilled, (state, action) => ({
        ...state,
        loading: false,
        expertData: action.payload,
      }))
      .addCase(queryExpertDetails.rejected, (state, action) => ({
        ...state,
        loading: false,
        error: action.error.message,
      }));
  },
});

export default queryExpertsSlice.reducer;
