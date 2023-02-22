import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import backgroundLocalReducer from '../features/background/backgroundLocalSclice';
import weatherReducer from '../features/weather/weatherSlice';
import quoteReducer from '../features/quotes/quoteSlice';
import backgroundUnsplashReducer from '../features/background/backgroundUnsplashSlice';
import tasksReducer from '../features/tasks/tasksSlice';
import locationManuallyReducer from '../features/locationSelection/locationManuallySlice';
import locationAutoReducer from '../features/locationSelection/locationAutoSlice';
import modalWindowReducer from '../features/modalWindow/modalWindowSlice';

export const store = configureStore({
  reducer: {
    backgroundLocal: backgroundLocalReducer,
    backgroundUnsplash: backgroundUnsplashReducer,
    weather: weatherReducer,
    quote: quoteReducer,
    tasks: tasksReducer,
    locationManually: locationManuallyReducer,
    locationAuto: locationAutoReducer,
    modalWindow: modalWindowReducer,
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
