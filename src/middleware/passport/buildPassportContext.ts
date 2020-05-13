/* eslint-disable max-len */
import passport from 'passport';
import {
  AuthenticateParams,
  AuthenticatePromiseParams,
  AuthenticateReturn,
  BuildPassportContextParams,
  Done,
  ExpressParams,
  Info,
  LoginParams,
  LoginPromiseParams,
} from 'types/passportTypes';

const authenticatePromise = ({
  authenticateOptions,
  req,
  res,
  strategyName,
}: AuthenticatePromiseParams): Promise<AuthenticateReturn> => (
  new Promise<AuthenticateReturn>((resolve, reject) => {
    const done: Done = (
      error: Error | undefined,
      user: object | undefined,
      info?: Info | undefined,
    ): void => {
      if (error) reject(error);
      else resolve({ user, info });
    };

    const authenticateFunction = passport.authenticate(strategyName, authenticateOptions, done);
    return authenticateFunction(req, res);
  }));

const loginPromise = ({
  authenticateOptions,
  request,
  user,
}: LoginPromiseParams) => new Promise<void>((resolve, reject) => {
  const done = (err: Error | undefined): void => {
    if (err) reject(err);
    else resolve();
  };

  request.login(user, authenticateOptions, done);
});

export default ({ req, res }: ExpressParams): BuildPassportContextParams => {
  const authenticateFn = ({
    authenticateOptions,
    strategyName,
  }: AuthenticateParams): Promise<AuthenticateReturn> => (
    authenticatePromise({
      authenticateOptions,
      req,
      res,
      strategyName,
    })
  );

  const loginFn = ({ authenticateOptions, user }: LoginParams): Promise<void> => (
    loginPromise({ authenticateOptions, user, request: req })
  );

  return {
    authenticate: authenticateFn,
    getUserId: () => req.user.id,
    isAuthenticated: () => req.isAuthenticated(),
    login: loginFn,
    logout: () => req.logout(),
    req,
    res,
  };
};
