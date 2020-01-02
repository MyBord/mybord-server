import { Prisma } from 'prisma-binding';

// Creates new Prisma instance
const prisma = new Prisma({
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: process.env.PRISMA_SECRET,
  typeDefs: 'src/generated/prisma.graphql',
});

export default prisma;
