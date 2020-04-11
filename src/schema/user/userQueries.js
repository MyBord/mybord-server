import getUserId from 'utils/getUserId';

export default {
  currentUser: async (parent, args, { passport }, info) => passport.getUser(),
  isAuthenticated: async (parent, args, { passport }, info) => (
    passport.isAuthenticated()
  ),
  users: async (parent, args, { prisma, request }, info) => {
    const userId = getUserId(request, false);

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
