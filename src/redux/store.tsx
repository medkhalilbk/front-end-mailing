import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger';
import { getDefaultMiddleware } from '@reduxjs/toolkit'
import userReducer from './userSlice'
const middleware = [...getDefaultMiddleware(), logger];

export const store = configureStore({
    reducer: {
      user:userReducer
    },
    middleware
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch