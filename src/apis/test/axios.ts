import instance from '@apis/instance';
import { TestResponse } from '@apis/test/type';

export const postJbtiTest = async (result: string): Promise<TestResponse> => {
  const response = await instance.post<TestResponse>(`/v2/api/templestay/type`, { result });
  return response.data;
};
