import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Config from "../../service/config";

export const userApiSlice = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: Config.baseUrl }),
  endpoints: (builder) => ({
    fetchUsers: builder.query({
      query: () => Config.getUsers,
    }),
    fetchUserById: builder.query({
      query: (id) => `${Config.getUserById}/${id}`,
    }),
  }),
});

export const { useFetchUsersQuery, useFetchUserByIdQuery } = userApiSlice;
