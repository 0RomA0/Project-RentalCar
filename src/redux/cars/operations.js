import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


axios.defaults.baseURL = "https://car-rental-api.goit.global";


export const fetchCars = createAsyncThunk(
  "cars/fetchAll",
  async ({ page = 1, limit = 12, brand, rentalPrice, minMileage, maxMileage }, thunkAPI) => {
    try {
      const res = await axios.get("/cars", {
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
  }
);

export const loadMoreCars = createAsyncThunk(
  "cars/loadMore",
  async ({ page, limit = 12, brand, rentalPrice, minMileage, maxMileage }, thunkAPI) => {
    try {
      const res = await axios.get("/cars", {
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
  }
);




export const fetchCarById = createAsyncThunk("cars/fetchById", async (id, thunkAPI) => {
    try {
        const response = await axios.get(`/cars/${id}`);
            return response.data;
    } catch (e) {
      
        return thunkAPI.rejectWithValue(e.message);
    }
});


