
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import vacanciesReducer from "./slices/vacanciesSlice";

const rootReducer = combineReducers({
  vacancies: vacanciesReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
