export default {
  createCard: async (parent, args, { prisma }, info) => prisma.mutation.createCard(args.data, info),
  createCardData: async (parent, args, { prisma }, info) => prisma.mutation.createCardData(args.data, info),
  createPost: async (parent, args, { prisma }, info) => prisma.mutation.createPost(args.data, info),
  createComment: async (parent, args, { prisma }, info) => prisma.mutation.createComment(args.data, info),
};
