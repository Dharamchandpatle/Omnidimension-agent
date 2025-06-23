import { createSlice } from '@reduxjs/toolkit';

// Get initial state from localStorage (if remember me)
const user = JSON.parse(localStorage.getItem('user') || "null");

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: !!user,
    user: user || null
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    }
  }
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;