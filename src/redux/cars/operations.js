import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../constants/api';

export const fetchCars = createAsyncThunk(
  'cars/fetchAll',
  async (
    { page = 1, limit = 12, brand, rentalPrice, minMileage, maxMileage },
    thunkAPI,
  ) => {
    try {
      const res = await api.get('/cars', {
        params: { page, limit, brand, rentalPrice, minMileage, maxMileage },
      });

      return {
        items: res.data.cars,
        page,
        totalCars: res.data.totalCars,
        totalPages: res.data.totalPages,
      };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

export const fetchCarById = createAsyncThunk(
  'cars/fetchById',
  async (id, thunkAPI) => {
    try {
      const response = await api.get(`/cars/${id}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);
