import { configureStore } from "@reduxjs/toolkit";
import { authApiSlice } from "./Features/Api/authApiSlice";
import { userApiSlice } from "./Features/Api/userApiSlice";
import { EventApiSlice } from "./Features/Api/eventApiSlice";
import authSlice from "./Features/Auth/authSlice";
import userSlice from "./Features/User/userSlice";
import eventSlice from "./Features/Event/eventSlice";
import { CategoryApiSlice } from "./Features/Api/categoryApiSlice";
import categorySlice from "./Features/Category/categorySlice";

export const store = configureStore({
  reducer: {
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    [userApiSlice.reducerPath]: userApiSlice.reducer,
    [EventApiSlice.reducerPath]: EventApiSlice.reducer,
    [CategoryApiSlice.reducerPath]: CategoryApiSlice.reducer,
    auth: authSlice,
    user: userSlice,
    event: eventSlice,
    category: categorySlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApiSlice.middleware,
      userApiSlice.middleware,
      EventApiSlice.middleware,
      CategoryApiSlice.middleware,
    ),
});
