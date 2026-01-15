import instance from '@apis/instance';
import { ApiResponse } from '@apis/response';
import { TestResponse } from '@apis/test/type';

export const postJbtiTest = async (result: string): Promise<TestResponse> => {
  const response = await instance.post<ApiResponse<TestResponse>>(`/v2/api/templestay/type`, {
    result,
  });

  return response.data.data;
};

export const postTestResult = async (type: string) => {
  const response = await instance.post('/v2/user/type', {
    type,
  });

  return response;
};
