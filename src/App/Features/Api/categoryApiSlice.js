import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Config from "../../service/config";

export const CategoryApiSlice = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({ baseUrl: Config.baseUrl }),
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => Config.getCategories,
    }),
    getCategoryById: builder.query({
      query: () => Config.getCategoryById,
    }),
    addCategory: builder.mutation({
      query: (newCategory) => ({
        url: Config.createEventCategory,
        method: "POST",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: newCategory,
      }),
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useAddCategoryMutation,
} = CategoryApiSlice;
