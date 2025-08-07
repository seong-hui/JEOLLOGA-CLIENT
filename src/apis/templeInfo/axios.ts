import instance from '@apis/instance';

export const getTempleDetails = async (id: number) => {
  const res = await instance.get(`/v2/api/templestay/details/${id}`);
  return res.data;
};

export const getTempleImages = async (id: number) => {
  const res = await instance.get(`/v2/api/templestay/images/${id}`);
  return res.data;
};

export const getTempleReviews = async (id: number, page: number) => {
  const res = await instance.get(`/v2/api/templestay/${id}/reviews`, {
    params: { page },
  });
  return res.data;
};

export const postViewNum = async (id: number) => {
  const res = await instance.post(`/v2/api/templestay/view/${id}`);
  return res;
};
