import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/users/user-slice";
import bannersSlice from "../features/banners/bannersSlice";
import axiosInterceptors from "./service/axiosInterceptors";

const rootReducer = combineReducers({
  user: userReducer,
  banners: bannersSlice,
});
const store = configureStore({
  reducer: rootReducer,
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({ serializableCheck: false }).concat(
      axiosInterceptors
    );
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
