import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import baseURL from '../apiConfig';

export const logoutDetails = createAsyncThunk('authentication/logout', async () => {
  try {
    const userObject = sessionStorage.getItem('userPassport');
    const jsonObject = JSON.parse(userObject);
    const responseDetails = await axios.delete(`${baseURL}logout`, {
      headers: {
        Authorization: jsonObject.token,
      },
    });
    return responseDetails.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

const logoutSlice = createSlice({
  name: 'authentication',
  initialState: {
    userLogout: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutDetails.pending, (state) => ({
        ...state,
        loading: true,
        error: null,
      }))
      .addCase(logoutDetails.fulfilled, (state, action) => ({
        ...state,
        loading: false,
        userData: action.payload,
      }))
      .addCase(logoutDetails.rejected, (state, action) => ({
        ...state,
        loading: false,
        error: action.error.message,
      }));
  },
});

export default logoutSlice.reducer;
