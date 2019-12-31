import jwt from 'jsonwebtoken';
import { Request } from 'types/requestTypes';

interface Props {
  request: Request;
  requireAuthentication?: boolean;
  userId?: string;
}

const verifyUserAccess = ({
  request,
  requireAuthentication = true,
  userId = null,
}: Props): void => {
  if (requireAuthentication) {
    const header = request.req.headers.authorization;

    if (!header) {
      throw new Error('Authentication required.');
    }

    const token = header.split(' ')[1];
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET);

    if (userId !== decoded.userId) {
      throw new Error('User does not have access.');
    }
  }
};

export default verifyUserAccess;
