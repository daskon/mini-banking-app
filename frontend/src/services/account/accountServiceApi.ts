// src/services/account/accountServicesApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Account {
  id: string;
  balance: number;
  type: string;
}

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  description: string;
}

export const accountServiceApi = createApi({
  reducerPath: "accountServiceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000",
    credentials: "include", 
  }),
  endpoints: (builder) => ({
    getAccounts: builder.query<Account[], void>({
      query: () => "/accounts",
    }),
    getTransactions: builder.query<Transaction[], void>({
      query: () => "/transactions",
    }),
  }),
});

export const { useGetAccountsQuery, useGetTransactionsQuery } = accountServiceApi;