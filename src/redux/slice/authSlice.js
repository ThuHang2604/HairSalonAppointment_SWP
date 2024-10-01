import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../axiosCustom';
import { setUserAuthToken } from '../authServices';

export const loginUser = createAsyncThunk('auth/loginUser', async (credentials, { rejectWithValue }) => {
  try {
    const response = await instance.post('/users/Login', {
      username: credentials.username,
      password: credentials.password,
    });
    const { data } = response;

    // Lưu token vào headers của Axios
    setUserAuthToken(data.jwt);

    return data;
  } catch (error) {
    // Xử lý lỗi
    return rejectWithValue(error.response?.data || 'Login failed');
  }
});

export const registerUser = createAsyncThunk('auth/registerUser', async (userDetails, { rejectWithValue }) => {
  try {
    const response = await instance.post('/users/Register', {
      username: userDetails.username,
      password: userDetails.password,
      email: userDetails.email,
    });
    const { data } = response;
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Registration failed');
  }
});

// Khởi tạo slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    isLoading: false,
    isAuthenticated: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      setUserAuthToken(null);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.jwt;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

const {
  reducer: authReducer,
  actions: { logout },
} = authSlice;

export { authReducer as default };
