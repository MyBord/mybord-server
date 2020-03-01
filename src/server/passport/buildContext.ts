// ToDo: credit
import passport from 'passport';
import {
  AuthenticateParams,
  AuthenticateReturn,
  ExpressParams,
  Info,
  LoginParams,
  PromisifiedAuthenticateParams,
  PromisifiedLoginParams,
} from './passportTypes';

const promisifiedAuthenticate = ({
  authenticateOptions,
  request,
  response,
  strategyName,
}: PromisifiedAuthenticateParams): Promise<AuthenticateReturn> => (
  new Promise<AuthenticateReturn>((resolve, reject) => {
    const done = (
      err: Error | undefined,
      user: object | undefined,
      info?: Info | undefined,
    ): void => {
      if (err) reject(err);
      else resolve({ user, info });
    };

    const authenticateFunction = passport.authenticate(strategyName, authenticateOptions, done);
    return authenticateFunction(request, response);
  }));

const promisifiedLogin = ({
  authenticateOptions,
  request,
  user,
}: PromisifiedLoginParams): Promise<void> => new Promise<void>((resolve, reject) => {
  const done = (err: Error | undefined): void => {
    if (err) reject(err);
    else resolve();
  };

  request.login(user, authenticateOptions, done);
});

// todo: move to types
export interface Context {
  authenticate: (
    { authenticateOptions, strategyName }: AuthenticateParams
  ) => Promise<AuthenticateReturn>;
  isAuthenticated: () => boolean;
  isUnauthenticated: () => boolean;
  login: ({ authenticateOptions, user }: LoginParams) => Promise<void>;
  logout: () => void;
}

export default ({ request, response }: ExpressParams): Context => {
  const authenticate = (
    { authenticateOptions, strategyName }: AuthenticateParams,
  ): Promise<AuthenticateReturn> => (
    promisifiedAuthenticate({
      authenticateOptions,
      request,
      response,
      strategyName,
    })
  );

  const isAuthenticated = (): boolean => request.isAuthenticated();

  const isUnauthenticated = (): boolean => request.isUnauthenticated();

  const login = ({ authenticateOptions, user }: LoginParams): Promise<void> => (
    promisifiedLogin({ authenticateOptions, request, user })
  );

  const logout = (): void => request.logout();

  return {
    authenticate,
    isAuthenticated,
    isUnauthenticated,
    login,
    logout,
  };
};
