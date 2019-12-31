import verifyUserAccess from 'utils/verifyUserAccess';

export default {
  createComment: async (parent, args, { prisma, request }, info) => {
    verifyUserAccess({ request, userId: args.data.author.connect.id });
    return prisma.mutation.createComment(args, info);
  },
  deleteComment: async (parent, args, { prisma, request }, info) => {
    const comment = await prisma.query.comments(args, '{ author { id } }');
    verifyUserAccess({ request, userId: comment[0].author.id });
    return prisma.mutation.deleteComment(args, info);
  },
  updateComment: async (parent, args, { prisma, request }, info) => {
    const comment = await prisma.query.comments(args, '{ author { id } }');
    verifyUserAccess({ request, userId: comment[0].author.id });
    return prisma.mutation.updateComment(args, info);
  },
};
