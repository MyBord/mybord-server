export default async (parent, args, { passport, prisma }) => {
  const isAuthenticated = passport.isAuthenticated();

  if (isAuthenticated) {
    const currentUserId = passport.getUserId();

    const queryArgs = {
      where: {
        id: currentUserId,
      },
    };

    const currentUser = await prisma.query.user(queryArgs, '{ id, email, username }');

    const { id, email, username } = currentUser;

    return {
      id,
      email,
      isAuthenticated,
      username,
    };
  }

  return {
    id: undefined,
    email: undefined,
    isAuthenticated,
    username: undefined,
  };
};
