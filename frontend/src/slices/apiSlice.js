import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseUrl: "" });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({}),
  
  onError: (error) => {
    console.log("errorrrrrrrrrrr1");
    // Handle errors globally
    if (error.status === 401) {
      
      window.location.href = '/auth';
    }
  },
});

