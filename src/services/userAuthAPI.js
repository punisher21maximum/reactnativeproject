// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const userAuthAPI = createApi({
  reducerPath: "userAuthAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://raezungton.pythonanywhere.com/",
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (user) => {
        return {
          url: "user/users/register/",
          method: "POST",
          body: user,
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
    }),
    loginUser: builder.mutation({
      query: (user) => {
        return {
          url: "user/users/login/",
          method: "POST",
          body: user,
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),
    changeUserPassword: builder.mutation({
      query: ({ formdata, access }) => {
      // query: ({ formdata }) => {
        return {
          url: "user/password/change/",
          method: "POST",
          body: formdata,
          headers: {
            'authorization': `Bearer ${access}`,
          },
          // headers: {
          //   "Accept": "application/json",
          //   "Content-type": "application/json",
          // },
        };
      },
    }),
    articlesList: builder.query({
      query: (access) => {
        return {
          url: "polls/articles/",
          method: "GET",
          // body: formdata,
          headers: {
            'authorization': `Bearer ${access}`,
            // "Content-Type": "application/json",
          }
        };
      },
    }),
    articleCreate: builder.mutation({
      query: ({access, formdata}) => {
        console.log("My Log start", access, "break", formdata, "My Log end");
        return {
          url: "polls/articles/",
          method: "POST",
          body: formdata,
          headers: {
            'authorization': `Bearer ${access}`,
          }
        };
      },
    }),
    profileView: builder.mutation({
      query: (access) => {
        return {
          url: "polls/articles/",
          method: "GET",
          // body: formdata,
          headers: {
            'authorization': `Bearer ${access}`,
          }
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useChangeUserPasswordMutation,
  useArticlesListQuery,
  useArticleCreateMutation
} = userAuthAPI;
