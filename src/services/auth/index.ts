import { API, parseResponseData } from '@/services/api';
import { RawResponse } from '@/services/api/types';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { LoginResponse } from './types';

export const useLogin = (
  options?: UseMutationOptions<LoginResponse, AxiosError, any>,
) => useMutation({
  mutationFn: async (data: any) => {
    return API
      .post<RawResponse<LoginResponse>>('/auth/login', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
      .then(data => parseResponseData(data));
  },
  ...options
});
