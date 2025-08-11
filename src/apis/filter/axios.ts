import { TemplestaySearchParamsV2 } from '@apis/filter/type';
import instance from '@apis/instance';
import MESSAGES from '@apis/messages';
import { isAxiosError } from 'axios';

const fetchFilteredListV2 = async (params: TemplestaySearchParamsV2) => {
  try {
    const response = await instance.get('/v2/api/templestay', { params });

    return response.data.data;
  } catch (error) {
    if (isAxiosError(error)) throw error;
    else throw new Error(MESSAGES.UNKNOWN_ERROR);
  }
};

export default fetchFilteredListV2;
