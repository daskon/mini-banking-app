import { configureStore } from "@reduxjs/toolkit";
import { authServiceApi } from "../services/auth/authServiceApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { accountServiceApi } from "../services/account/accountServiceApi";

export const store = configureStore({
  reducer: {
    [authServiceApi.reducerPath]: authServiceApi.reducer,
    [accountServiceApi.reducerPath]: accountServiceApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
       .concat(authServiceApi.middleware)
       .concat(accountServiceApi.middleware)
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
