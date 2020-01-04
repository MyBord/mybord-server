import { ApolloServer } from 'apollo-server-express';
import { buildContext } from 'graphql-passport';
import resolvers from './sampleResolvers';
import typeDefs from './sampleTypeDefs';
import prisma from './prisma';
import db from '../db';

// creates new apollo server
const server = new ApolloServer({
  context: ({ req, res }) => ({
    passport: buildContext({ req, res, db }),
    prisma,
  }),
  resolvers,
  typeDefs,
});

export default server;
