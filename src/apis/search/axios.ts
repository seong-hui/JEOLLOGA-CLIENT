import instance from '@apis/instance';

export const delSearchRecord = async (searchId: number) => {
  const res = await instance.delete(`/v2/user/search/${searchId}`);

  return res.data;
};

export const delAllSearchRecord = async () => {
  const res = await instance.delete('/v2/user/search');

  return res.data;
};

export const getSearchHistory = async () => {
  const res = await instance.get('/v2/user/search-list');

  return res.data;
};
