export default async (parent, args, { passport, prisma }) => {
  const isAuthenticated = passport.isAuthenticated();

  if (isAuthenticated) {
    const currentUserId = passport.getUserId();

    const queryArgs = {
      where: {
        id: currentUserId,
      },
    };

    const currentUser = await prisma.query.user(queryArgs, '{ email, username }');

    const { email, username } = currentUser;

    return {
      email,
      isAuthenticated,
      username,
    };
  }

  return {
    email: undefined,
    isAuthenticated,
    username: undefined,
  };
};
