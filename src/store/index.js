import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import authSlice from './slice/authSlice';
import smsDutySlice from './slice/smsDutySlice'; 
import rollingDutySlice from './slice/rollingDutySlice'; 
import calibrationDutySlice from './slice/calibrationDutySlice'; 
import ndtDutySlice from './slice/ndtDutySlice';
import viDutySlice from './slice/viDutySlice';
import weldingDutySlice from './slice/weldingDutySlice';
import qctDutySlice from './slice/qctDutySlice';

const persistConfig = {
	key: 'root',
	version: 1,
	storage,
	whitelist: ['auth', 'smsDuty', 'rollingDuty', 'calibrationDuty', 'ndtDuty', 'viDuty', 'weldingDuty', 'qctDuty'],
};

const rootReducer = combineReducers({
  auth: authSlice,
  smsDuty: smsDutySlice,
  rollingDuty: rollingDutySlice,
  calibrationDuty: calibrationDutySlice,
  ndtDuty: ndtDutySlice,
  viDuty: viDutySlice,
  weldingDuty: weldingDutySlice,
  qctDuty: qctDutySlice
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false })

});

export const persistor = persistStore(store);
export default store;