import ServerError from 'server/serverError';
import {
  testPasswordStrength,
  validateEmail,
  validateUsername,
} from '../../userUtils/userUtils';

export default async (parent, args, { prisma }) => {
  try {
    const { email, password, username } = args.data;

    testPasswordStrength(password);

    await validateEmail(prisma, email);

    await validateUsername(prisma, username);

    return true;
  } catch (error) {
    if (error.message === 'invalid username') {
      throw new ServerError({ message: error.message, status: 400 });
    }
    if (error.message === 'duplicate username') {
      throw new ServerError({ message: error.message, status: 400 });
    }
    if (error.message === 'duplicate email') {
      throw new ServerError({ message: 'duplicate email', status: 400 });
    }
    if (error.message === 'weak password') {
      throw new ServerError({ message: error.message, status: 400 });
    }
    throw new ServerError(error);
  }
};
