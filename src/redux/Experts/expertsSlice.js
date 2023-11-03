import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import baseURL from '../apiConfig';

export const fetchExperts = createAsyncThunk(
  'experts/fetchExperts',
  async () => {
    try {
      const response = await axios.get(baseURL);
      return response.data;
    } catch (error) {
      throw Error('Error fetching experts');
    }
  },
);

export const toggleRemoveExpert = createAsyncThunk('experts/removeExpert', async (id) => {
  await axios.put(`${baseURL}/experts/${id}/toggle_remove`);
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
        const expertId = action.payload;
        const expertUpdate = state.find((expert) => expert.id === expertId);
        if (expertUpdate) {
          // Toggle the 'removed' status
          expertUpdate.removed = !expertUpdate.removed;
        }
      });
  },
});

export default expertsSlice.reducer;
