import { configureStore, Middleware } from '@reduxjs/toolkit';
import rootReducers from './ducks/rootReducers';

const middlewares: Middleware[] = [];

const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(middlewares),
});

export default store;

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch