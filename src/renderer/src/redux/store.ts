import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';

import combinedReducer from './reducers';

const store = configureStore({
  reducer: combinedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;

export { store, persistor };
