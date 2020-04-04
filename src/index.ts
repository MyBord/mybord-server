import http from 'http';
import initializeMiddleware from 'server/initializeMiddleware';
import initializePrisma from 'server/initializePrisma';
import initializeServer from 'server/initializeServer';

// We initialize our Prisma db instance
const prisma = initializePrisma();

// We initialize our middleware
const middleware = initializeMiddleware(prisma);

// We initialize our Apollo Server
const server = initializeServer(
  middleware.expressSessionMiddleware,
  middleware.passportMiddleware,
  middleware.passportSessionMiddleware,
  prisma,
);

// We apply the express middleware to our server
server.applyMiddleware({
  app: middleware.expressMiddleware,
  cors: false,
  path: '/graphql',
});

const PORT = 4000;

// We create an http server and then add subscriptions
// https://www.apollographql.com/docs/apollo-server/data/subscriptions/#subscriptions-with-additional-middleware
const httpServer = http.createServer(middleware.expressMiddleware);
server.installSubscriptionHandlers(httpServer);

// We run our http server.
httpServer.listen(PORT, () => {
  console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  console.log(`Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`);
});

// Using webpack's hot module replacement, if needed.
if (process.env.NODE_ENV !== 'PROD' && module.hot) {
  module.hot.accept();
  module.hot.dispose(() => server.stop());
}
