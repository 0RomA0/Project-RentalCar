import { createSlice } from "@reduxjs/toolkit";

import { fetchBrands } from "./operations";

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};


const filtersSlice = createSlice({
    name: "filters",
    initialState: {
        brand: "",
        rentalPrice: "",
        minMileage: "",
        maxMileage: "",
        brands: [],
        isLoading: false,
        error: null,
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
          state.brand = "";
          state.rentalPrice = "";
          state.minMileage = "";
          state.maxMileage = "";
    },
  },
    extraReducers: builder => {
        builder
            .addCase(fetchBrands.pending, handlePending)
            .addCase(fetchBrands.rejected, handleRejected)
            .addCase(fetchBrands.fulfilled, (state, action) => {
                state.isLoading = false;
                state.brands = action.payload;
               
            })
            
    }
});



export const {
  setBrand,
  setPrice,
  setMileageFrom,
  setMileageTo,
  resetFilters,
} = filtersSlice.actions;


export default filtersSlice.reducer;


