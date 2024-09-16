import { API, parseResponseData } from "@/services/api";
import { RawResponse } from "@/services/api/types";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useUpload = (
  options?: UseMutationOptions<any, AxiosError, any>,
) => useMutation({
  mutationFn: async (data: any) => {
    return API
      .post<RawResponse<any>>(`/upload`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
      .then(data => parseResponseData(data));
  },
  ...options
});
