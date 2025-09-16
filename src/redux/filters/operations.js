import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../constants/api';

export const fetchBrands = createAsyncThunk(
  'filters/fetchBrands',
  async (_, thunkAPI) => {
    try {
      const response = await api.get('/brands');
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);
