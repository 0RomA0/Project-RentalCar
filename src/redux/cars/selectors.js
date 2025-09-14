


export const selectCars = (state) => state.cars.items;

export const selectIsLoading = (state) => state.cars.isLoading;

export const selectError = (state) => state.cars.error;

export const selectCurrentCar = (state) => state.cars.currentCar;

export const selectPage = state => state.cars.page;

export const selectTotalPages = state => state.cars.totalPages;