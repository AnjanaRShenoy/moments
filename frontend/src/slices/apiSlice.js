import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseUrl: "" });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({}),
<<<<<<< HEAD
  
  onError: (error) => {
    console.log("errorrrrrrrrrrr1");
    // Handle errors globally
    if (error.status === 401) {
      
      window.location.href = '/auth';
    }
  },
=======


>>>>>>> 2d77eba291877a20fe0877d73a93a06c2f0fc125
});

