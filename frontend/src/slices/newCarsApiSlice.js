import { NEWCARS_URL, UPLOADS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const newCarsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNewCars: builder.query({
      query: () => ({
        url: NEWCARS_URL,
      }),
      providesTags: ["NewCars"],
      keepUnusedDataFor: 5,
    }),
    getNewCarDetails: builder.query({
      query: (newCarId) => ({
        url: `${NEWCARS_URL}/${newCarId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createNewCar: builder.mutation({
      query: () => ({
        url: NEWCARS_URL,
        method: "POST",
      }),
      invalidatesTags: ["NewCar"],
    }),
    updateNewCar: builder.mutation({
      query: (data) => ({
        url: `${NEWCARS_URL}/${data.newCarId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["NewCars"],
    }),
    uploadNewImage: builder.mutation({
      query: (data) => ({
        url: `${UPLOADS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    deleteNewCar: builder.mutation({
      query: (newCarId) => ({
        url: `${NEWCARS_URL}/${newCarId}`,
        method: "DELETE",
      }),
    }),
    getNewCarsByPriceAsc: builder.query({
      query: () => ({
        url: `${NEWCARS_URL}/sort/asc`,
      }),
      providesTags: ["NewCars"],
      keepUnusedDataFor: 5,
    }),

    getNewCarsByPriceDesc: builder.query({
      query: () => ({
        url: `${NEWCARS_URL}/sort/desc`,
      }),
      providesTags: ["NewCars"],
      keepUnusedDataFor: 5,
    }),
    getNewCarBrands: builder.query({
      query: () => ({
        url: `${NEWCARS_URL}/brands`,
      }),
      providesTags: ["NewCarBrands"],
      keepUnusedDataFor: 5,
    }),
    getModelsByBrand: builder.query({
      query: (brand) => ({
        url: `${NEWCARS_URL}/models/${brand}`, 
      }),
    }),
    getFilteredCars: builder.query({
      query: (filters) => ({
        url: `${NEWCARS_URL}/filter`,
        params: filters,
      }),
    }),
  }),
});

export const {
  useGetNewCarsQuery,
  useGetNewCarDetailsQuery,
  useCreateNewCarMutation,
  useUploadNewImageMutation,
  useDeleteNewCarMutation,
  useUpdateNewCarMutation,
  useGetNewCarsByPriceAscQuery,
  useGetNewCarsByPriceDescQuery,
  useGetNewCarBrandsQuery,
  useGetModelsByBrandQuery,
  useGetFilteredCarsQuery,
} = newCarsApiSlice;
