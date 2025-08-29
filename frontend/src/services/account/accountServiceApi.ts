import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Account {
  id: number;
  balance: number;
  transactions: Transaction[];
}

export interface Transaction {
  id: number;
  beneficiaryAccNo: number;
  beneficiaryBankName: string;
  createdAt: string;
  amount: number;
  type: string;
}

export interface SendMoneyData {
  fromAccountId: number;
  beneficiaryAccNo: number;
  beneficiaryBankName: string;
  amount: number;
  description?: string;
}

export interface Response {
  success: boolean;
  message: string;
}

export const accountServiceApi = createApi({
  reducerPath: "accountServiceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getAccounts: builder.query<Account[], number>({
      query: (id) => `/accounts/${id}`,
    }),
    getTransactions: builder.query<Transaction[], void>({
      query: () => "/transactions",
    }),
    transferMoney: builder.mutation<Response, SendMoneyData>({
      query: (data) => ({
        url: "/accounts/transfer",
        method: "POST",
        body: data
      })
    }),
  }),
});

export const { useGetAccountsQuery, useGetTransactionsQuery, useTransferMoneyMutation } = accountServiceApi;