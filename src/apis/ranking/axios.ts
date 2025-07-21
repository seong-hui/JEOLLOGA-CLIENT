import instance from '@apis/instance';

const getRanking = async () => {
  const res = await instance.get('/v2/api/templestay/recommendation');

  return res.data;
};

export default getRanking;
