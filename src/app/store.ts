import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import backgroundLocalReducer from '../features/background/backgroundLocalSclice';
import weatherReducer from '../features/weather/weatherSlice';
import quoteReducer from '../features/quotes/quoteSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    backgroundLocal: backgroundLocalReducer,
    weather: weatherReducer,
    quote: quoteReducer,
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
