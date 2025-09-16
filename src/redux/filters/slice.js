import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    brand: '',
    rentalPrice: '',
    minMileage: '',
    maxMileage: '',
  },

  reducers: {
    setBrand: (state, action) => {
      state.brand = action.payload;
    },
    setPrice: (state, action) => {
      state.rentalPrice = action.payload;
    },
    setMileageFrom: (state, action) => {
      state.minMileage = action.payload;
    },
    setMileageTo: (state, action) => {
      state.maxMileage = action.payload;
    },
    resetFilters: (state) => {
      state.brand = '';
      state.rentalPrice = '';
      state.minMileage = '';
      state.maxMileage = '';
    },
  },
});

export const {
  setBrand,
  setPrice,
  setMileageFrom,
  setMileageTo,
  resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
