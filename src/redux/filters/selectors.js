export const selectFilters = (state) => state.filters;

export const selectBrands = (state) => state.filters.items;

export const selectBrandsLoading = (state) => state.filters.isLoading;

export const selectFiltersError = (state) => state.filters.error;
