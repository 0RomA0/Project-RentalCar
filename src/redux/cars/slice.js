import { createSlice } from '@reduxjs/toolkit';

import { fetchCars, fetchCarById } from './operations';

const handlePending = (state) => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const carsSlice = createSlice({
  name: 'cars',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    currentCar: null,
    page: 1,
    totalPages: null,
  },

  reducers: {
    setPage: (state, { payload }) => {
      state.page = payload;
    },
    resetCars: (state) => {
      state.items = [];
      state.page = 1;
      state.totalPages = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, handlePending)
      .addCase(fetchCars.rejected, handleRejected)
      .addCase(fetchCars.fulfilled, (state, action) => {
        if (action.payload.page === 1) {
          state.items = action.payload.items;
        } else {
          state.items = [...state.items, ...action.payload.items];
        }
        state.totalPages = action.payload.totalPages;
        state.page = action.payload.page;
        state.isLoading = false;
      })
      .addCase(fetchCarById.pending, handlePending)
      .addCase(fetchCarById.rejected, handleRejected)
      .addCase(fetchCarById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.currentCar = action.payload;
      });
  },
});

export const { resetCars, setPage } = carsSlice.actions;

export default carsSlice.reducer;
