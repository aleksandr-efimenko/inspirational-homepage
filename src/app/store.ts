import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import backgroundLocalReducer from '../features/background/backgroundLocalSclice';
import weatherReducer from '../features/weather/weatherSlice';
import quoteReducer from '../features/quotes/quoteSlice';
import backgroundUnsplashReducer from '../features/background/backgroundUnsplashSlice';
import tasksReducer from '../features/tasks/tasksSlice';

export const store = configureStore({
  reducer: {
    backgroundLocal: backgroundLocalReducer,
    backgroundUnsplash: backgroundUnsplashReducer,
    weather: weatherReducer,
    quote: quoteReducer,
    tasks: tasksReducer
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
