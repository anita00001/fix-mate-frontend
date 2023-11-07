import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import baseURL from '../apiConfig';

export const logoutDetails = createAsyncThunk('authentication/logout', async () => {
  try {
    const navigate = useNavigate();
    const userObject = sessionStorage.getItem('userPassport');
    const jsonObject = JSON.parse(userObject);
    const response = await axios.delete(`${baseURL}logout`, {
      headers: {
        Authorization: jsonObject.token,
      },
    });

    if (response.status === 200) {
      sessionStorage.removeItem('userPassport');
      navigate('/login');
    }
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
