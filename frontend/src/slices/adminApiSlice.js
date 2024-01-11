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
<<<<<<< HEAD
            query: (data) => ({
=======
            query: () => ({
>>>>>>> 2d77eba291877a20fe0877d73a93a06c2f0fc125
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

<<<<<<< HEAD
        blockUser: builder.mutation({
            query: (data) => ({
                url: `${ADMIN_URL}/blockUser`,
                method: "POST",
                body: data,
            }),
        }),
=======
       
>>>>>>> 2d77eba291877a20fe0877d73a93a06c2f0fc125

      
       

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

<<<<<<< HEAD
        getPost:builder.query({
            query:(data)=>({
                url:`${ADMIN_URL}/getPost`,
                method:"GET",
                body:data
            })
        })
=======
        blockUser: builder.mutation({
            query:(data)=>({
                url:`${ADMIN_URL}/blockUser`,
                method:"POST",
                body:data,
            }),
        }),

        
>>>>>>> 2d77eba291877a20fe0877d73a93a06c2f0fc125
    })
})
export const {

  useAdminLoginMutation,
  useAdminLogoutMutation,
  useListUsersQuery,
  useSearchUsersMutation,
  useBlockUserMutation,
  useEditUserMutation,
  useGetUserMutation,
  usePostDeleteMutation,
<<<<<<< HEAD
  useGetPostQuery,
=======
  useBlockUserMutation,
  useGetPostQuery,

>>>>>>> 2d77eba291877a20fe0877d73a93a06c2f0fc125
} = userAdminApiSlice;
