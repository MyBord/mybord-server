import { Prisma } from 'prisma-binding';

// We initialize our Prisma db instance with the generated Prisma graphql schema
export default (): Prisma => new Prisma({
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: process.env.PRISMA_SECRET,
  typeDefs: 'src/schema/typeDefs/prismaSchema.graphql',
});
