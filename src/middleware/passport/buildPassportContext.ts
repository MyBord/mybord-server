/* eslint-disable max-len */
import passport, { AuthenticateOptions } from 'passport';
import express from 'express';
import { ExecutionParams } from 'subscriptions-transport-ws';
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
// import { AuthenticateReturn, IVerifyOptions } from './types';

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

interface CommonRequest<UserObjectType extends {}>
  extends Pick<Context<UserObjectType>, 'isAuthenticated' | 'isUnauthenticated'> {
  user?: UserObjectType;
}

export interface Context<UserObjectType extends {}> {
  isAuthenticated: () => boolean;
  isUnauthenticated: () => boolean;
  getUser: () => UserObjectType;
  authenticate: (
    { authenticateOptions, strategyName }: AuthenticateParams
  ) => Promise<AuthenticateReturn>;
  login: ({ authenticateOptions, user }: { authenticateOptions: AuthenticateOptions; user: object }) => Promise<void>;
  logout: () => void;
  res?: express.Response;
  req: CommonRequest<UserObjectType>;
}

// do export default
const buildContext = ({ req, res }: ExpressParams): BuildPassportContextParams => {
  const login = ({ authenticateOptions, user }: LoginParams): Promise<void> => (
    loginPromise({ authenticateOptions, user, request: req })
  );

  const authenticate = ({ authenticateOptions, strategyName }: AuthenticateParams): Promise<AuthenticateReturn> => (
    authenticatePromise({
      authenticateOptions,
      req,
      res,
      strategyName,
    })
  );

  // @ts-ignore
  return {
    isAuthenticated: () => req.isAuthenticated(),
    // @ts-ignore
    getUser: () => req.user.id,
    // @ts-ignore
    req,
    authenticate,
    login,
    logout: () => req.logout(),
    res,
  };
};

export default buildContext;
