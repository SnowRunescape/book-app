import { API, parseResponseData } from "@/services/api";
import { RawResponse } from "@/services/api/types";
import { CEP } from "@/types/CEP";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useCEP = (
  cep: string,
  options?: Omit<UseQueryOptions<CEP, AxiosError>, 'queryKey' | 'queryFn'>,
) => useQuery({
  queryKey: ['cep', cep],
  queryFn: async () => {
    return API
    .get<RawResponse<CEP>>(`https://brasilapi.com.br/api/cep/v1/${cep}`)
    .then(data => parseResponseData(data))
  },
  ...options
});
