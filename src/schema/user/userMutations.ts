import ServerError from 'serverError/serverError';
import hashPassword from 'utils/hashPassword';
import restrictUserData from 'utils/restrictUserData';

export default {
  createUser: async (parent, args, { passport, prisma }, info) => {
    try {
      const password = await hashPassword(args.data.password);
      const finalArgs = {
        ...args,
        data: {
          ...args.data,
          password,
        },
      };

      const user = await prisma.mutation.createUser(finalArgs, info);

      passport.login({ authenticateOptions: args.data, user });

      return restrictUserData(user);
    } catch (error) {
      if (error.message.includes('unique constraint')) {
        throw new ServerError({ message: 'duplicate user', status: 400 });
      }
      if (error.message === 'password is weak') {
        throw new ServerError({ message: error.message, status: 400 });
      }
    }
  },
  loginUser: async (parent, args, { passport }, info) => {
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
  },
};
