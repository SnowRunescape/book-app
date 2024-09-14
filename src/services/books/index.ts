import { API, parseResponseData } from "@/services/api";
import { RawResponse } from "@/services/api/types";
import { Book } from "@/types/Book";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
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
