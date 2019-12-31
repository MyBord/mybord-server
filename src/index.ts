import http from 'http';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { Prisma } from 'prisma-binding';
import resolvers from 'schema/resolvers';
import generatedSchema from 'generated/prisma.graphql';
import schema from 'schema/schema.graphql';

// Creates new Prisma instance
const prisma = new Prisma({
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: process.env.PRISMA_SECRET,
  typeDefs: 'src/generated/prisma.graphql',
});

// Creates new Apollo Server
const server = new ApolloServer({
  context(request) {
    return {
      prisma,
      request,
    };
  },
  resolvers,
  typeDefs: [generatedSchema, schema],
});

// Adds express as middleware to our server.
const app = express();
server.applyMiddleware({ app });

// Declares what port our server will use. Heroku uses a randomly generated port via the node
// env 'PORT'. If this is a dev server, we will fall back to port 4000.
const PORT = process.env.PORT || 4000;

// We create an http server from our apollo server.
const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

// We run our http server.
httpServer.listen(PORT, () => {
  console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  console.log(`Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`);
});

// Using webpack's hot module replacement, if needed.
if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => server.stop());
}
