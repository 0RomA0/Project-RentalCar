import { configureStore } from '@reduxjs/toolkit';
import CarsReducer from './cars/slice';
import FiltersReducer from './filters/slice';
import FavoritesReducer from './favorites/slice';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const favoritesPersistConfig = {
  key: 'favorites',
  storage,
};

const persistedFavoritesReducer = persistReducer(
  favoritesPersistConfig,
  FavoritesReducer,
);

export const store = configureStore({
  reducer: {
    cars: CarsReducer,
    filters: FiltersReducer,
    favorites: persistedFavoritesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
