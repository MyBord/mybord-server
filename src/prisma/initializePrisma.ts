import { Prisma } from 'prisma-binding';

// We initialize our Prisma db instance with the generated Prisma graphql schema
export default (): Prisma => new Prisma({
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: 'sample_prisma_secret',
  typeDefs: 'src/schema/typeDefs/prismaSchema.graphql',
});
