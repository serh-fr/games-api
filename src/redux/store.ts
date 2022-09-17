import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import gamesSlice from './slices/games.slice';

export const store = configureStore({
  reducer: {
    gamesSlice,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch