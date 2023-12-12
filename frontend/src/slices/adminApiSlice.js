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

        listUsers: builder.query({
            query: () => ({
                url: `${ADMIN_URL}/listUsers`,
                method: "GET",
                
            }),
        }),

        getPost: builder.query({
            query: () => ({
                url: `${ADMIN_URL}/getPost`,
                method: "GET",
              
            }),
        }),
        

        searchUsers: builder.mutation({
            query: (data) => ({
                url: `${ADMIN_URL}/search-users`,
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

        postDelete: builder.mutation({
            query:(data)=>({
                url:`${ADMIN_URL}/deletePost`,
                method:"POST",
                body:data,
            }),
        }),

        blockUser: builder.mutation({
            query:(data)=>({
                url:`${ADMIN_URL}/blockUser`,
                method:"POST",
                body:data,
            }),
        }),

        
    })
})
export const {

  useAdminLoginMutation,
  useAdminLogoutMutation,
  useListUsersQuery,
  useSearchUsersMutation,
  useDeleteUserMutation,
  useEditUserMutation,
  useGetUserMutation,
  usePostDeleteMutation,
  useBlockUserMutation,
  useGetPostQuery,

} = userAdminApiSlice;
