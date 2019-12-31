import verifyUserAccess from 'utils/verifyUserAccess';

export default {
  comments: async (parent, args, { prisma, request }, info) => {
    verifyUserAccess({ request, requireAuthentication: false });
    return prisma.query.comments(args, info);
  },
};
