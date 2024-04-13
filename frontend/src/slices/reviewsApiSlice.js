import { apiSlice } from "./apiSlice";
import { REVIEWS_URL } from "../constants";

export const reviewsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getReviews: builder.query({
            query: () => ({
                url: REVIEWS_URL,
            }),
            providesTags: ['Reviews'],
            keepUnusedDataFor: 5,
        }),

    }),
});


export const { useGetReviewsQuery } = reviewsApiSlice;
