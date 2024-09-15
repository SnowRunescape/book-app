import { queryClient } from "@/contexts/providers/react-query";
import { API, parseResponseData } from "@/services/api";
import { RawResponse } from "@/services/api/types";
import { Book } from "@/types/Book";
import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useBooks = (
  options?: UseQueryOptions<Book[], AxiosError>,
) => useQuery({
  queryKey: ['books'],
  queryFn: async () => {
    return API
    .get<RawResponse<Book[]>>(`/books`)
    .then(data => parseResponseData(data))
  },
  ...options
});

export const useCreateBook = (
  options?: UseMutationOptions<Book, AxiosError, any>,
) => useMutation({
  mutationFn: async (data: any) => {
    return API
      .post<RawResponse<Book>>(`/books`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
      .then(data => parseResponseData(data));
  },
  onSuccess: async () => {
    queryClient.removeQueries({
      queryKey: ['books'],
      type: 'all',
    });
  },
  ...options
});
