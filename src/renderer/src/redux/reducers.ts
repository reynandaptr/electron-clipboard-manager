import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
// import createElectronStorage from 'redux-persist-electron-storage';
import storage from 'redux-persist/lib/storage';

import clipboard from './clipboard';

const persistConfig = {
  key: 'root',
  storage,
};

const reducers = combineReducers({
  clipboard,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export default persistedReducer;
