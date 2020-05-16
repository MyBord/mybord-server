import bcrypt from 'bcryptjs';
import testPasswordStrength from './testPasswordStrength';

const hashPassword = (password: string): Promise<string> => {
  testPasswordStrength(password);

  return bcrypt.hash(password, 10);
};

export default hashPassword;
