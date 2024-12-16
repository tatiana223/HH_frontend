
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import vacanciesReducer from "./slices/vacanciesSlice";
import userReducer from './slices/userSlice';

const rootReducer = combineReducers({
  vacancies: vacanciesReducer,
  user: userReducer, 
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;

