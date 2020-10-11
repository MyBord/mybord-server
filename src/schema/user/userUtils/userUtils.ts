import bcrypt from 'bcryptjs';
import { Prisma } from 'prisma-binding';
import { User } from './userTypes';

export const restrictUserData = (user): User => ({
  ...user,
  email: 'null',
  password: 'null',
});

const testPasswordStrength = (password): void => {
  const passwordArray = password.split('');

  const specialCharacters = ['!', '@', '#', '$', '&', '*', '-'];
  const isUpperCase = (string): boolean => /^[A-Z]*$/.test(string);

  const hasNumber = /\d/.test(password);
  const hasSpecialCharacters = passwordArray.some((i) => specialCharacters.includes(i));
  const hasUpperCase = passwordArray.some((i) => isUpperCase(i));
  const isLongEnough = password.length > 7;

  const isPasswordStrong = hasNumber && hasSpecialCharacters && hasUpperCase && isLongEnough;

  if (!isPasswordStrong) {
    throw new Error('weak password');
  }
};

export const hashPassword = (password: string): Promise<string> => {
  testPasswordStrength(password);

  return bcrypt.hash(password, 10);
};

export const validateUsername = async (prisma: Prisma, username: string): Promise<void> => {
  const usersArgs = {
    where: { username },
  };

  const users = await prisma.query.users(usersArgs, '{ username }');

  if (users.length > 0) {
    throw new Error('duplicate username');
  }

  const regex = RegExp(/^[\w\d_.-]+$/g);

  if (!regex.test(username)) {
    throw new Error('invalid username');
  }
};
