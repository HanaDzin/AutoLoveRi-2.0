import { USEDCARS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const usedCarsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsedCars: builder.query({
      query: () => ({
        url: USEDCARS_URL,
      }),
      keepUnusedDataFor: 5,
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
        method: "POST",
      }),
      invalidatesTags: ["UsedCar"],
    }),
    updateUsedCar: builder.mutation({
      query: (data) => ({
        url: `${USEDCARS_URL}/${data.usedCarId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["UsedCars"],
    }),
    deleteUsedCar: builder.mutation({
      query: (usedCarId) => ({
        url: `${USEDCARS_URL}/${usedCarId}`,
        method: "DELETE",
      }),
    }),
    getUsedCarsByPriceAsc: builder.query({
      query: () => ({
        url: `${USEDCARS_URL}/sort/asc`,
      }),
      providesTags: ["UsedCars"],
      keepUnusedDataFor: 5,
    }),

    getUsedCarsByPriceDesc: builder.query({
      query: () => ({
        url: `${USEDCARS_URL}/sort/desc`,
      }),
      providesTags: ["UsedCars"],
      keepUnusedDataFor: 5,
    }),
    getUsedCarBrands: builder.query({
      query: () => ({
        url: `${USEDCARS_URL}/brands`,
      }),
      providesTags: ["UsedCarBrands"],
      keepUnusedDataFor: 5,
    }),
    getUsedCarsModelsByBrand: builder.query({
      query: (brand) => ({
        url: `${USEDCARS_URL}/models/${brand}`,
      }),
    }),
    getFilteredUsedCars: builder.query({
      query: (filters) => ({
        url: `${USEDCARS_URL}/filter`,
        params: filters,
      }),
    }),
  }),
});

export const {
  useGetUsedCarsQuery,
  useGetUsedCarDetailsQuery,
  useCreateUsedCarMutation,
  useUpdateUsedCarMutation,
  useDeleteUsedCarMutation,
  useGetFilteredUsedCarsQuery,
  useGetUsedCarsByPriceAscQuery,
  useGetUsedCarsByPriceDescQuery,
  useGetUsedCarBrandsQuery,
  useGetUsedCarsModelsByBrandQuery
} = usedCarsApiSlice;
