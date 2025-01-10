import { configureStore } from '@reduxjs/toolkit';
import vacanciesReducer from './slices/vacanciesSlice'; // создадим редьюсер для городов

const store = configureStore({
  reducer: {
    vacancies: vacanciesReducer, // добавляем редьюсер для города
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;