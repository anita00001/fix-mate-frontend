import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import baseURL from '../apiConfig';

export const loginDetails = createAsyncThunk('authentication/login', async (identity) => {
  try {
    const response = await axios.post(`${baseURL}login`, {
      user: {
        email: identity.email,
        password: identity.password,
      },
    });
    const authorizationToken = response.headers.authorization;
    sessionStorage.setItem('userPassport', authorizationToken);
    return response.data;
  } catch (error) {
    throw new Error('Login failed. Check your credentials');
  }
});

const loginSlice = createSlice({
  name: 'authentication',
  initialState: {
    userData: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginDetails.pending, (state) => ({
        ...state,
        loading: true,
        error: null,
      }))
      .addCase(loginDetails.fulfilled, (state, action) => ({
        ...state,
        loading: false,
        userData: action.payload,
      }))
      .addCase(loginDetails.rejected, (state, action) => ({
        ...state,
        loading: false,
        error: action.error.message,
      }));
  },
});

export default loginSlice.reducer;
