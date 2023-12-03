import { ADMIN_URL, USERS_URL } from "../constants/constants";
import { apiSlice } from "./apiSlice";
export const userAdminApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
       

        adminLogin: builder.mutation({
            query: (data) => ({
                url: `${ADMIN_URL}/auth`,
                method: "POST",
                body: data,
            }),
        }),

        listUsers: builder.mutation({
            query: (data) => ({
                url: `${ADMIN_URL}/list-users`,
                method: "GET",
                body: data,
            }),
        }),

        searchUsers: builder.mutation({
            query: (data) => ({
                url: `${ADMIN_URL}/search-users`,
                method: "POST",
                body: data,
            }),
        }),

        deleteUser: builder.mutation({
            query: (data) => ({
                url: `${ADMIN_URL}/delete-user`,
                method: "POST",
                body: data,
            }),
        }),

        getUser: builder.mutation({
            query: (data) => ({
                url: `${ADMIN_URL}/get-user`,
                method: "POST",
                body: data,
            }),
        }),

        editUser: builder.mutation({
            query: (data) => ({
                url: `${ADMIN_URL}/edit-user`,
                method: "POST",
                body: data,
            }),
        }),

        adminLogout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: "POST",
            }),
        }),
    })
})
export const {

  useAdminLoginMutation,
  useAdminLogoutMutation,
  useListUsersMutation,
  useSearchUsersMutation,
  useDeleteUserMutation,
  useEditUserMutation,
  useGetUserMutation
} = userAdminApiSlice;
