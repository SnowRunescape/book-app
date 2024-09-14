import { API, parseResponseData } from "@/services/api";
import { RawResponse } from "@/services/api/types";
import { Customer } from "@/types/Customer";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
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
