const resolvers = {
  Query: {
    isAuthenticated: (parent, args, context) => context.passport.isAuthenticated(),
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
