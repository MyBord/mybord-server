const resolvers = {
  Query: {
    currentUser: (parent, args, context) => context.passport.getUser(),
    isAuthenticated: (parent, args, context) => {
      console.log('invoked');
      try {
        return context.passport.isAuthenticated();
      } catch (e) {
        console.log('000');
        console.log(e);
      }
    },
  },
  Mutation: {
    login: async (parent, { email, password }, context) => {
      const { user } = await context.passport.authenticate('graphql-local', { email, password });
      context.passport.login(user);
      return { user };
    },
  },
};

export default resolvers;
