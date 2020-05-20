import { Request } from 'express';
import { Strategy } from 'passport-strategy';
import { Done, Info, VerifyFunction } from 'types/passportTypes';

class LocalStrategy extends Strategy {
  public constructor(cb: VerifyFunction) {
    super();
    this.verify = cb;
    this.name = 'local';
  }

  public verify: VerifyFunction;

  public name: string;

  public authenticate(req: Request, options: { email: string; password: string }): void {
    const { email, password } = options;

    const done: Done = (error: Error, user: object, info?: Info) => {
      if (error) {
        return this.error(error);
      }
      if (!user) {
        return this.fail(info, 401);
      }
      return this.success(user, info);
    };

    this.verify(email, password, done);
  }
}

export default LocalStrategy;
