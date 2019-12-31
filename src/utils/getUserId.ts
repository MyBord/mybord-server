import jwt from 'jsonwebtoken';
import { Request } from 'types/requestTypes';

const getUserId = (request: Request, requireAuthentication: boolean = true): string => {
  const header = request.req
    ? request.req.headers.authorization
    : request.connection.context.Authorization;

  if (header) {
    const token = header.split(' ')[1];
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.userId;
  }

  if (requireAuthentication) {
    throw new Error('Authentication required');
  }

  return null;
};

export default getUserId;
