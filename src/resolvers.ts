import { withFilter } from 'graphql-subscriptions';

const resolvers = {
  Query: {
    currentUser: (parent, args, context) => {
      console.log('--- currentUser response ---');
      console.log(`isAuthenticated: ${context.passport.isAuthenticated()}`);
      console.log(`isUnauthenticated: ${context.passport.isUnauthenticated()}`);
      console.log(`getUser: ${context.passport.getUser()}`);
      return context.passport.getUser();
    },
  },
  Mutation: {
    login: async (parent, { email, password }, context) => {
      const { user } = await context.passport.authenticate('graphql-local', { email, password });
      context.login(user);

      console.log('--- login response ---');
      console.log(`isAuthenticated: ${context.passport.isAuthenticated()}`);
      console.log(`isUnauthenticated: ${context.passport.isUnauthenticated()}`);
      console.log(`getUser: ${context.passport.getUser()}`);

      return { user };
    },
  },
  Subscription: {
    isUserAuthenticated: {
      subscribe(parent, args, { passport, pubsub }, info) {
        return pubsub.asyncIterator(passport.isAuthenticated());
      },
    },
  },
};

export default resolvers;
