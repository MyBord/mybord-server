const resolvers = {
  Query: {
    currentUser: (parent, args, context) => {
      console.log('--- currentUser response ---');
      console.log(`isAuthenticated: ${context.isAuthenticated()}`);
      console.log(`isUnauthenticated: ${context.isUnauthenticated()}`);
      console.log(`getUser: ${context.getUser()}`);
      return context.getUser();
    },
  },
  Mutation: {
    login: async (parent, { email, password }, context) => {
      const { user } = await context.authenticate('graphql-local', { email, password });
      context.login(user);

      console.log('--- login response ---');
      console.log(`isAuthenticated: ${context.isAuthenticated()}`);
      console.log(`isUnauthenticated: ${context.isUnauthenticated()}`);
      console.log(`getUser: ${context.getUser()}`);

      return { user };
    },
  },
  Subscription: {

  }
};

export default resolvers;
