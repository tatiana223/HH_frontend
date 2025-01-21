import { configureStore } from '@reduxjs/toolkit';
import vacanciesReducer from './slices/vacanciesSlice'; // создадим редьюсер для городов
import userReducer from './slices/userSlice';
import responseDraftReducer from './slices/responseDraftSlice'; 

const store = configureStore({
  reducer: {
    vacancies: vacanciesReducer, // добавляем редьюсер для васансий
    user: userReducer, 
    responseDraft: responseDraftReducer,  
  },
  
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;