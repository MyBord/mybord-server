export default async (parent, args, { passport, prisma }, info) => {
  try {
    const currentUserId = passport.getUserId();

    const deleteUserArgs = {
      where: {
        id: currentUserId,
      },
    };

    await prisma.mutation.deleteUser(deleteUserArgs, info);

    return true;
  } catch (error) {
    throw new Error(error);
  }
};
