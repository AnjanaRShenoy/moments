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

    resendOtp: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/resendOtp`,
        method: "POST",
        body: data,
      })
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
      query: ({ _id }) => ({
        url: `${USERS_URL}/listPost?_id=${_id}`,
        method: "GET",

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
      query: ({ _id }) => ({
        url: `${USERS_URL}/profile?_id=${_id}`,
        method: "GET",
      })
    }),


    updateUser: builder.mutation({
      query: (data) => ({
        url: `/api/users/updateProfile`,
        method: "POST",
        body: data,
      }),
    }),


    updateProfileImage: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profileUpdateImage`,
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

    reportComment: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/reportComment`,
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
      query: ({ _id }) => ({
        url: `${USERS_URL}/savedPost?_id=${_id}`,
        method: "GET",

      })
    }),


    checkUserBlocked: builder.query({
      query: ({ _id }) => ({
        url: `${USERS_URL}/checkUserBlocked?_id=${_id}`,
        method: "GET"
      })
    }),

    follow: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/follow`,
        method: "POST",
        body: data
      })
    }),

    unfollow: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/unfollow`,
        method: "POST",
        body: data
      })
    }),

    editComment: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/editComment`,
        method: "PATCH",
        body: data
      })
    }),

    deleteComment: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/deleteComment`,
        method: "DELETE",
        body: data
      })
    }),

    deletePost: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/deletePost`,
        method: "DELETE",
        body: data
      })
    }),

    editCaption: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/editCaption`,
        method: "PATCH",
        body: data
      })
    }),

    removeFollower: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/removeFollower`,
        method: "DELETE",
        body: data
      })
    }),

    removeFollowing: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/removeFollowing`,
        method: "DELETE",
        body: data
      })
    }),

    search: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/search`,
        method: "POST",
        body: data
      })
    }),

    userProfile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/userProfile`,
        method: "POST",
        body: data
      })
    }),

    follower: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/follower`,
        method: "POST",
        body: data
      })
    }),

    getMessage: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/getMessage`,
        method: "POST",
        body: data
      })
    }),

    sendMessage: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/sendMessage`,
        method: "POST",
        body: data
      })
    }),

    request: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/request`,
        method: "POST",
        body: data
      })
    }),

    suggestions: builder.query({
      query: ({ _id }) => ({
        url: `${USERS_URL}/suggestions?_id=${_id}`,
        method: "GET"
      })
    }),

    payment: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/payment`,
        method: "POST",
        body: data
      })
    }),
    
    chat: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/chat`,
        method: "POST",
        body: data
      })
    }),

    deleteNotification: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/deleteNotification`,
        method: "POST",
        body: data
      })
    }),

  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useResendOtpMutation,
  useOtpMutation,
  usePostMutation,
  useListPostQuery,
  useCommentMutation,
  useProfileQuery,
  useUpdateUserMutation,
  useUpdateProfileImageMutation,
  useLikePostMutation,
  useReportPostMutation,
  useReportCommentMutation,
  useSavePostMutation,
  useGetSavedPostQuery,
  useCheckUserBlockedQuery,
  useFollowMutation,
  useEditCommentMutation,
  useDeleteCommentMutation,
  useDeletePostMutation,
  useEditCaptionMutation,
  useRemoveFollowerMutation,
  useRemoveFollowingMutation,
  useSearchMutation,
  useUserProfileMutation,
  useFollowerMutation,
  useGetMessageMutation,
  useSendMessageMutation,
  useRequestMutation,
  useUnfollowMutation,
  useSuggestionsQuery,
  usePaymentMutation,
  useChatMutation,
  useDeleteNotificationMutation,

} = userAdminApiSlice;
