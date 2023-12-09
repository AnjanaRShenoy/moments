import { ADMIN_URL, USERS_URL } from "../constants/constants";
import { apiSlice } from "./apiSlice";

export const userAdminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),

    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
    }),

    otp: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/checkOtp`,
        method: "POST",
        body: data,
      }),
    }),

    // to post the posts
    post: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/post`,
        method: "POST",
        body: data
      })
    }),

    // to list the posts in homepage
    listPost: builder.query({
      query: (data) => ({
        url: `${USERS_URL}/listPost`,
        method: "GET",
        body: data
      })
    }),

    // to post the comments in homepage
    comment: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/comment`,
        method: "POST",
        body: data
      })
    }),

    // to get the user details from backend
    profile: builder.query({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "GET",
        body: data
      })
    }),


    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),

    updateProfileImage: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile-updateImage`,
        method: "PUT",
        body: data,
      }),
    }),

    likePost: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/likePost`,
        method: "POST",
        body: data,
      })
    }),
    reportPost: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/reportPost`,
        method: "POST",
        body: data,
      })
    }),
    savePost: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/savePost`,
        method: "POST",
        body: data,
      })
    }),
getSavedPost: builder.query({
  query: (data) => ({
    url: `${USERS_URL}/savedPost`,
    method: "GET",
    body: data
  })
}),


  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useOtpMutation,
  usePostMutation,
  useListPostQuery,
  useCommentMutation,
  useProfileQuery,
  useUpdateUserMutation,
  useUpdateProfileImageMutation,
  useLikePostMutation,
  useReportPostMutation,
  useSavePostMutation,
  useGetSavedPostQuery
} = userAdminApiSlice;
