import { configureStore } from "@reduxjs/toolkit";
import crypto from "./cryptoSlice"
import assets from "./assetsSlice"

const store = configureStore({
  reducer: {
    crypto,
    assets
  }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch