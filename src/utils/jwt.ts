import jwt from 'jsonwebtoken';

const getToken = (id: string): string => {
  const token = jwt.sign({ id }, 'mysecret');
  jwt.verify(token, 'mysecret');
  return token;
};

export default {
  getToken,
};
