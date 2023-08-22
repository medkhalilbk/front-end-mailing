import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger';
import { getDefaultMiddleware } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import costumersSlice from './costumerSlice';
const middleware = [...getDefaultMiddleware(), logger];

export const store = configureStore({
    reducer: {
    user: userReducer, 
    costumers:costumersSlice
    },
    middleware
}) 
export type RootState = ReturnType<typeof store.getState> 
export type AppDispatch = typeof store.dispatch