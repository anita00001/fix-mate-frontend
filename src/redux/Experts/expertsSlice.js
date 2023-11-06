import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import baseURL from '../apiConfig';

export const fetchExperts = createAsyncThunk(
  'experts/fetchExperts',
  async () => {
    try {
      const response = await axios.get(`${baseURL}api/v1/experts`);
      return response.data;
    } catch (error) {
      throw Error('Error fetching experts');
    }
  },
);

export const toggleRemoveExpert = createAsyncThunk('experts/removeExpert', async (id) => {
  await axios.put(`${baseURL}api/v1/experts/${id}/toggle_remove`);
  return id;
});

const initialState = {
  experts: [],
  loading: false,
  error: null,
};

const expertsSlice = createSlice({
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
      }).addCase(toggleRemoveExpert.fulfilled, (state, action) => {
        // Find the expert in the state and update its removed status based on the returned ID
        const experts = state.experts.filter((expert) => expert.id !== action.payload);
        return {
          ...state,
          experts,
        };
      });
  },
});

export default expertsSlice.reducer;
