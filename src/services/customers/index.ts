import { queryClient } from "@/contexts/providers/react-query";
import { API, parseResponseData } from "@/services/api";
import { RawResponse } from "@/services/api/types";
import { Customer } from "@/types/Customer";
import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useCustomers = (
  options?: UseQueryOptions<Customer[], AxiosError>,
) => useQuery({
  queryKey: ['customers'],
  queryFn: async () => {
    return API
    .get<RawResponse<Customer[]>>(`/customers`)
    .then(data => parseResponseData(data))
  },
  ...options
});

export const useCreateCustomer = (
  options?: UseMutationOptions<Customer, AxiosError, any>,
) => useMutation({
  mutationFn: async (data: any) => {
    return API
      .post<RawResponse<Customer>>(`/customers`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
      .then(data => parseResponseData(data));
  },
  onSuccess: async () => {
    queryClient.removeQueries({
      queryKey: ['customers'],
      type: 'all',
    });
  },
  ...options
});
