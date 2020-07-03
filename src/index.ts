import http from 'http';
import initializeMiddleware from 'middleware/initializeMiddleware';
import initializeServer from 'server/initializeServer';

// We initialize our middleware
const {
  expressMiddleware,
  expressSessionMiddleware,
  passportMiddleware,
  passportSessionMiddleware,
  prisma,
} = initializeMiddleware();

// We initialize our Apollo Server
const server = initializeServer(
  expressSessionMiddleware,
  passportMiddleware,
  passportSessionMiddleware,
  prisma,
);

// We apply the express middleware to our server
server.applyMiddleware({
  app: expressMiddleware,
  cors: false,
  path: '/graphql',
});

// We create an http server and then add subscriptions
// https://www.apollographql.com/docs/apollo-server/data/subscriptions/#subscriptions-with-additional-middleware
const httpServer = http.createServer(expressMiddleware);
server.installSubscriptionHandlers(httpServer);

// We run our http server.
httpServer.listen(process.env.PORT, () => {
  console.log(`Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`);
  console.log(`Subscriptions ready at ws://localhost:${process.env.PORT}${server.subscriptionsPath}`);
});

// Using webpack's hot module replacement, if needed.
if (process.env.NODE_ENV !== 'PROD' && module.hot) {
  module.hot.accept();
  module.hot.dispose(() => server.stop());
}
