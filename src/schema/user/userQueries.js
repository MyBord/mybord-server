import getUserId from 'utils/getUserId';
import verifyUserAccess from 'utils/verifyUserAccess';

export default {
  currentUser: async (parent, args, { passport }, info) => passport.getUser(),
  isAuthenticated: async (parent, args, { passport }, info) => (
    passport.isAuthenticated()
  ),
  me: async (parent, args, { prisma, request }, info) => {
    verifyUserAccess({ request, userId: args.userId });
    const finalArgs = {
      where: {
        ...args.where,
        id: args.userId,
      },
    };
    return prisma.query.user(finalArgs, info);
  },
  users: async (parent, args, { prisma, request }, info) => {
    const userId = getUserId(request, false);

    // You shouldn't be able to run a filtered query where you ask for a particular set of
    // restricted fields are then returned that user, if that user, with said email address,
    // exists in the db. This essentially is can serve as a loophole to see if certain users
    // exist given the presence of certain restricted fields. These restricted fields are:
    // - user email address
    // - user token
    // - user hashed password
    const finalArgs = {
      ...args,
      where: {
        ...args.where,
      },
    };
    if (args && args.where && args.where.email) {
      delete finalArgs.where.email;
    }

    const users = await prisma.query.users(finalArgs, info);

    // return restricted user data
    return users.map(async (user) => {
      // allow the authenticated user to see all of their own data
      if (userId && userId === user.id) {
        return user;
      }

      // a user can not see the email address or un-published posts of other users
      const userPostsArgs = {
        where: {
          author: { id: user.id },
          published: true,
        },
      };
      const userPosts = await prisma.query.posts(userPostsArgs, null);

      const strippedUser = {
        ...user,
        email: 'null',
        password: 'null',
        posts: userPosts,
        token: null,
      };
      return strippedUser;
    });
  },
};
