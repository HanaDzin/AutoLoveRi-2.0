import { USEDCARS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const usedCarsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsedCars: builder.query({
            query: () => ({
                url: USEDCARS_URL,
            }),
            keepUnusedDataFor: 5
        }),
        getUsedCarDetails: builder.query({
            query: (usedCarId) => ({
                url: `${USEDCARS_URL}/${usedCarId}`,
            }),
            keepUnusedDataFor: 5,
        }),
        createUsedCar: builder.mutation({
            query: () => ({
                url: USEDCARS_URL,
                method: 'POST',
            }),
            invalidatesTags: ['UsedCar'],
        }),
        updateUsedCar: builder.mutation({
            query: (data) => ({
                url: `${USEDCARS_URL}/${data.usedCarId}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['UsedCars'],
        }),
        deleteUsedCar: builder.mutation ({
            query: (usedCarId) => ({
                url: `${USEDCARS_URL}/${usedCarId}`,
                method: 'DELETE',
            })
        })

    }),
});

export const { 
    useGetUsedCarsQuery, 
    useGetUsedCarDetailsQuery,
    useCreateUsedCarMutation,
    useUpdateUsedCarMutation,
    useDeleteUsedCarMutation } = usedCarsApiSlice;