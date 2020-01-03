const resolvers = {
  Query: {
    currentUser: (parent, args, context) => {
      console.log('************');
      console.log(context.getUser());
      console.log(context.isAuthenticated());
      console.log(context.isUnauthenticated());
      return context.getUser();
    },
  },
  Mutation: {
    login: async (parent, { email, password }, context) => {
      // instead of email you can pass username as well
      const { user, info } = await context.authenticate('graphql-local', {
        email,
        password,
      });

      // only required if express-session is used
      context.login(user);


      console.log('$$$$$$$$$$$$');
      console.log(context.getUser());
      console.log(context.isAuthenticated());
      console.log(context.isUnauthenticated());

      return { user };
    },
  },
};

export default resolvers;
