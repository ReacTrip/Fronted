import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import travelReducer from './slices/travelSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  travels: travelReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'], // redux-persist 관련 액션 무시
      },
    }),
});

export const persistor = persistStore(store);

// default export 추가
export default store;
