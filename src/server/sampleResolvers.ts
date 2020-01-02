import uuid from 'uuid/v4';

const resolvers = {
  Query: {
    currentUser: (parent, args, context) => {
      console.log('*********');
      console.log(context);
      return context.user;
    },
  },
  Mutation: {
    logout: (parent, args, context) => context.passport.logout(),
    login: async (parent, args, context) => {
      const { user } = await context.passport.authenticate(
        'graphql-local',
        args,
      );
      context.passport.login(user);
      return { user };
    },
    signup: (parent, args, context) => {
      const existingUsers = context.passport.db.getUsers();
      const userWithEmailAlreadyExists = !!existingUsers.find((user) => user.email === args.email);

      if (userWithEmailAlreadyExists) {
        throw new Error('User with email already exists');
      }

      const newUser = {
        id: uuid(),
        ...args,
      };

      context.passport.db.addUser(newUser);

      context.passport.login(newUser);

      return { user: newUser };
    },
  },
};

export default resolvers;
