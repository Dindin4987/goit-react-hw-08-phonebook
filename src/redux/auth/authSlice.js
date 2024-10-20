import { createSlice } from '@reduxjs/toolkit';
import { register, login, logout, refreshUser } from './authOperations';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: { name: null, email: null },
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
    isLoading: false,      // Added this
    isError: false,        // Added this
  },
  extraReducers: builder => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        // state.isLoggedIn = true;
        state.isError = false;   // Reset error state on success
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.isError = false;   // Reset error state on success
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.user = null;
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(refreshUser.pending, (state, _action) => {
        state.isLoading = true;
        state.isRefreshing = true;
        state.isLoggedIn = false;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isRefreshing = false;
        state.isLoggedIn = true;
        state.isError = false;   // Reset error state on success
      })
      .addCase(refreshUser.rejected, (state, _action) => {
        state.isLoading = false;  // Set loading to false on error
        state.isLoggedIn = false;
        state.isRefreshing = false;
        state.isError = true;    // Set error state on failure
      });
  },
});

export const authReducer = authSlice.reducer;
