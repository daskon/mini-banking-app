import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    username: string;
  };
}

export const authServiceApi = createApi({
  reducerPath: "authServiceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000",
    credentials: "include",
  }),
  endpoints: (builder) => ({

    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),

    me: builder.query<LoginResponse, void>({
        query: () => "/auth/me"
    }),

  }),
});

export const { useLoginMutation, useMeQuery } = authServiceApi;
