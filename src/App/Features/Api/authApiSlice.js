import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import Config from "../../service/config";

export const authApiSlice = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: Config.baseUrl }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (loginData) => ({
        url: Config.login,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: loginData,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApiSlice;
