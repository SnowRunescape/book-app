import { API, parseResponseData } from '@/services/api';
import { RawResponse } from '@/services/api/types';
import { User } from '@/types/User';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useUser = (
  options?: UseQueryOptions<User, AxiosError>,
) => useQuery({
  queryKey: ['user'],
  queryFn: async () => {
    return API
    .get<RawResponse<User>>("/user")
    .then(data => parseResponseData(data))
  },
  ...options
});
