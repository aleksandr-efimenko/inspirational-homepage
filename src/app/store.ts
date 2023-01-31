import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import backgroundReducer from '../features/background/backgroundSclice';
import weatherReducer from '../features/weather/weatherSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    background: backgroundReducer,
    weather: weatherReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
