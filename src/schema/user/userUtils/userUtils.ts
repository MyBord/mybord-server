import bcrypt from 'bcryptjs';
import { Prisma } from 'prisma-binding';
import { User } from './userTypes';

// ----- PASSWORD UTILS ----- //

export const hashPassword = (password: string): Promise<string> => bcrypt.hash(password, 10);

export const testPasswordStrength = (password): void => {
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

// ----- VALIDATION UTILS ----- //

export const validateEmail = async (prisma: Prisma, email: string): Promise<void> => {
  const usersArgs = {
    where: { email },
  };

  const users = await prisma.query.users(usersArgs, '{ email }');

  if (users.length > 0) {
    throw new Error('duplicate email');
  }
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

// ----- DATA RESTRICTION UTILS ----- //

export const restrictUserData = (user): User => ({
  ...user,
  email: 'null',
  password: 'null',
});
