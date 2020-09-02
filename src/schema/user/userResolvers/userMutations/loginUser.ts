import ServerError from 'server/serverError';
import { restrictUserData } from '../../userUtils/userUtils';

export default async (parent, args, { passport }) => {
  try {
    const { user } = await passport.authenticate({
      authenticateOptions: args.data,
      strategyName: 'local',
    });

    passport.login({ authenticateOptions: args.data, user });

    return restrictUserData(user);
  } catch (error) {
    throw new ServerError({ message: 'Unable to login', status: 401 });
  }
};
