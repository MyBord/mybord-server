import http from 'http';
import initializeMiddleware from 'middleware/initializeMiddleware';
import initializeServer from 'server/initializeServer';
import corsOptions from "middleware/corsOptions";

// We initialize our middleware
const {
  expressMiddleware,
  expressSessionMiddleware,
  passportMiddleware,
  passportSessionMiddleware,
  prisma,
} = initializeMiddleware();

// We add some html pages to our node server (helpful for debugging and making sure our
// deployments are up to date and accurate)
expressMiddleware.get('/', (req, res) => {
  res.sendFile('src/pages/index.html', { root: '.' });
});

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

// We declare what port our server will run on.
const PORT = process.env.PORT || 4000;

// We run our http server.
httpServer.listen(PORT, () => {
  if (process.env.MODE === 'LOCAL') {
    console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    console.log(`Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`);
  }
});

// Using webpack's hot module replacement, if needed.
if (process.env.MODE === 'LOCAL' && module.hot) {
  module.hot.accept();
  module.hot.dispose(() => server.stop());
}
