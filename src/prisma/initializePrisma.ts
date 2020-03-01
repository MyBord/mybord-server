import { Prisma } from 'prisma-binding';

// We initialize our Prisma db instance
const initializePrisma = (): Prisma => new Prisma({
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: process.env.PRISMA_SECRET,
  typeDefs: 'src/generated/prisma.graphql',
});

export default initializePrisma;
