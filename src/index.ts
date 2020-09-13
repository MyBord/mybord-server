import http from 'http';
import initializeMiddleware from 'middleware/initializeMiddleware';
import initializeServer from 'server/initializeServer';
import express from "express";

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

// We serve our public client application
expressMiddleware.use(express.static('public'));
expressMiddleware.get('*', (request, response) => {
  response.sendFile('public/index.html', { root: '.' });
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
    console.log(`Client ready at http://localhost:${PORT}`);
  }
});

// Using webpack's hot module replacement, if needed.
if (process.env.MODE === 'LOCAL' && module.hot) {
  module.hot.accept();
  module.hot.dispose(() => server.stop());
}
