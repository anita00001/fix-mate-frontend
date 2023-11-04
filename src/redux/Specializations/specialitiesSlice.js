import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import baseURL from '../apiConfig';

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

const specializeSlice = createSlice({
  name: 'specialization',
  initialState: {
    descriptionData: null,
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
      .addCase(specialDetails.fulfilled, (state, action) => ({
        ...state,
        loading: false,
        descriptionData: action.payload,
      }))
      .addCase(specialDetails.rejected, (state, action) => ({
        ...state,
        loading: false,
        error: action.error.message,
      }));
  },
});

export default specializeSlice.reducer;
