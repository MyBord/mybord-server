/* eslint-disable no-param-reassign */
import { Strategy as PassportStrategy } from 'passport-strategy';
import { Request as ExpressRequest } from 'express';
import { Info, VerifyFunction } from 'types/passportTypes';


class GraphQLLocalStrategy extends PassportStrategy {
  public constructor(options: VerifyFunction) {
    super();
    this.verify = options;
    this.passReqToCallback = false;
    this.name = 'graphql-local';
  }

  public verify: VerifyFunction;

  public passReqToCallback: boolean | undefined;

  public name: string;

  public authenticate(req: ExpressRequest, options: { email: string; password: string }) {
    const { email, password } = options;

    const done = (error: Error, user: object, info?: Info) => {
      if (error) {
        // @ts-ignore
        return this.error(err);
      }
      if (!user) {
        // @ts-ignore
        return this.fail(info, 401);
      }
      // @ts-ignore
      return this.success(user, info);
    };

    // @ts-ignore - not sure how tow handle this nicely in TS
    this.verify(email, password, done);
  }
}

export default GraphQLLocalStrategy;
