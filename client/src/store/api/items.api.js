import { api } from './api';

export const itemsApi = api.injectEndpoints({
  endpoints: builder => ({
    getAllCollectionItems: builder.query({
      query: (collectionId) => `/collections/${collectionId}/items`,
      providesTags: ['items']
    }),
    createItem: builder.mutation({
      query: ({ collectionId, item }) => {
        return {
          url: `/collections/${collectionId}/items`,
          method: 'POST',
          body: item
        }
      },
      invalidatesTags: ['items']
    }),
    updateItem: builder.mutation({
      query: ({ collectionId, itemId, item }) => {
        return {
          url: `/collections/${collectionId}/items/${itemId}`,
          method: 'PATCH',
          body: item
        }
      },
      invalidatesTags: ['items']
    }),
    getLastItems: builder.query({
      query: () => '/items',
      providesTags: ['lastItems']
    }),
  })
})

export const {
  useGetAllCollectionItemsQuery,
  useCreateItemMutation,
  useGetLastItemsQuery,
  useUpdateItemMutation
} = itemsApi;