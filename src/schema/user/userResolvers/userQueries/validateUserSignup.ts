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
    if (
      [
        'duplicate email',
        'duplicate username',
        'invalid username',
        'weak password',
      ].includes(error.message)
    ) {
      throw new ServerError({ message: error.message, status: 400 });
    }
    throw new ServerError(error);
  }
};
