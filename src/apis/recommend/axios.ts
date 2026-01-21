import instance from '@apis/instance';

export const getTypeRandom = async () => {
  const res = await instance.get('/v2/api/templestay/type-random');

  return res.data;
};

export const getTypeRecommend = async () => {
  const res = await instance.get('/v2/user/recommend/type');

  return res.data;
};
