import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import baseURL from '../apiConfig';

export const signupDetails = createAsyncThunk('authentication/signup', async (identity) => {
  try {
    const response = await axios.post(`${baseURL}signup`, {
      user: {
        name: identity.name,
        email: identity.email,
        password: identity.password,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('User registration failed');
  }
});

const signupSlice = createSlice({
  name: 'authentication',
  initialState: {
    signupData: {},
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupDetails.pending, (state) => ({
        ...state,
        isLoading: true,
        error: null,
      }))
      .addCase(signupDetails.fulfilled, (state, action) => ({
        ...state,
        isLoading: false,
        signupData: action.payload,
      }))
      .addCase(signupDetails.rejected, (state, action) => ({
        ...state,
        isLoading: false,
        error: action.error.message,
      }));
  },
});

export default signupSlice.reducer;
