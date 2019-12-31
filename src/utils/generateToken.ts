import jwt from 'jsonwebtoken';

const generateToken = (userId: string): string => jwt.sign(
  { userId },
  process.env.JWT_SECRET,
  { expiresIn: '1 day' },
);

export default generateToken;
