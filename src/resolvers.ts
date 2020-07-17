const resolvers = {
  Query: {
    isAuthenticated: (parent, args, { passport }) => {
      console.log('--- isAuthenticated response ---');
      console.log(`isAuthenticated: ${passport.isAuthenticated()}`);
      return passport.isAuthenticated();
    },
  },
  Mutation: {
    loginUser: async (parent, args, { passport }) => {
      const { user } = await passport.authenticate({
        authenticateOptions: args.data,
        strategyName: 'local',
      });

      passport.login({ authenticateOptions: args.data, user });

      return user;
    },
  },
};

export default resolvers;
