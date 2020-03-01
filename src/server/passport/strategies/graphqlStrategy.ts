/* eslint-disable no-param-reassign */
import { Strategy as PassportStrategy } from 'passport-strategy';
import { Request as ExpressRequest } from 'express';
// import { PassportContext, IVerifyOptions } from './types';

// @ts-ignore
type SharedPassportContext<
  UserObjectType extends {},
  Credentials extends {},
  AuthInfoTemplate extends {},
  Request extends object
> = {
  authInfo?: AuthInfoTemplate;
  user?: UserObjectType;
  getUser(): UserObjectType | undefined;

  login(user: Credentials, options?: any): Promise<void>;

  logout(): void;
  logOut(): void;

  isAuthenticated(): boolean;
  isUnauthenticated(): boolean;

  authenticate(type: string, credentials: Credentials): Promise<{ user: UserObjectType }>;

  req: Request;
};

export type PassportContext<
  UserObjectType extends {},
  Credentials extends {},
  AuthInfoTemplate extends {} = {},
  Request extends object = ExpressRequest
> = SharedPassportContext<UserObjectType, Credentials, AuthInfoTemplate, Request>;

export interface IVerifyOptions {
  info: boolean;
  message?: string;
}

type VerifyFn = (username: unknown, password: unknown, done: () => void) => void;

type VerifyFnWRequest = <U extends {}, Request extends object = ExpressRequest>(
  req: Request | PassportContext<U, Request>,
  username: unknown,
  password: unknown,
  done: (error: any, user?: any, options?: IVerifyOptions) => void,
) => void;

interface GraphQLLocalStrategyOptions {
  passReqToCallback?: boolean;
}

class GraphQLLocalStrategy<U extends {}, Request extends ExpressRequest = ExpressRequest> extends PassportStrategy {
  constructor(
    options?: GraphQLLocalStrategyOptions | VerifyFn | VerifyFnWRequest,
    verify?: VerifyFn | VerifyFnWRequest,
  ) {
    super();

    if (typeof options === 'function') {
      this.verify = options;
      this.passReqToCallback = false;
    } else {
      this.verify = verify;
      this.passReqToCallback = options.passReqToCallback;
    }
    if (!this.verify) {
      throw new TypeError('GraphQLLocalStrategy requires a verify callback');
    }

    this.name = 'graphql-local';
  }

  verify: VerifyFn | VerifyFnWRequest;

  passReqToCallback: boolean | undefined;

  name: string;

  authenticate(req: Request, options: { username?: string; email?: string; password: string }) {
    const { username, email, password } = options;

    const done = (err: Error, user: U, info?: IVerifyOptions) => {
      if (err) {
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

    if (this.passReqToCallback) {
      // @ts-ignore - not sure how tow handle this nicely in TS
      this.verify(req, username || email, password, done);
    } else {
      // @ts-ignore - not sure how tow handle this nicely in TS
      this.verify(username || email, password, done);
    }
  }
}

export default GraphQLLocalStrategy;
