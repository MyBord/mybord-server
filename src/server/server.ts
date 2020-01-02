import { ApolloServer } from 'apollo-server-express';
import resolvers from 'schema/resolvers';
import generatedSchema from 'generated/prisma.graphql';
import schema from 'schema/schema.graphql';
import prisma from './prisma';

// creates new apollo server
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

export default server;
