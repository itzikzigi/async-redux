import { configureStore } from "@reduxjs/toolkit";
import axiosInterceptors from "./service/axiosInterceptors";
import mySlice from "../slices/mySlice";

const store = configureStore({
  reducer: mySlice,

  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({ serializableCheck: false }).concat(
      axiosInterceptors
    );
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
