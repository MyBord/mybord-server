/* eslint-disable max-len */
import passport, { AuthenticateOptions } from 'passport';
import express from 'express';
import { ExecutionParams } from 'subscriptions-transport-ws';
import {
  AuthenticateParams,
  AuthenticatePromiseParams,
  BuildPassportContextParams,
  Done,
  ExpressParams,
  Info,
  LoginParams,
  LoginPromiseParams,
  PromisifiedAuthenticateParams,
  PromisifiedLoginParams,
} from 'types/passportTypes';
import { AuthenticateReturn, IVerifyOptions } from './types';

const authenticatePromise = ({
  authenticateOptions,
  request,
  response,
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
    return authenticateFunction(request, response);
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

const buildCommonContext = <UserObjectType extends {}>(req: CommonRequest<UserObjectType>, additionalContext: {}) => ({
  isAuthenticated: () => req.isAuthenticated(),
  isUnauthenticated: () => req.isUnauthenticated(),
  // @ts-ignore
  getUser: () => req.user.id,
  authenticate: (strategyName: string) => {
    throw new Error(`Authenticate (${strategyName}) not implemented for subscriptions`);
  },
  login: () => {
    throw new Error('Not implemented for subscriptions');
  },
  logout: () => {
    throw new Error('Not implemented for subscriptions');
  },
  req,
  ...additionalContext,
});

export interface ContextParams {
  req: express.Request;
  res: express.Response;
  connection?: ExecutionParams;
  payload?: unknown;
}

// function buildContext(contextParams: RegularContextParams): Context;
// function buildContext(contextParams: SubscriptionContextParams): SubscriptionContext;
const buildContext = <UserObjectType extends {}, R extends ContextParams = ContextParams>(
  contextParams: R,
): Context<UserObjectType> => {
  const {
    req, // set for queries and mutations
    res, // set for queries and mutations
    connection, // set for subscriptions
    payload, // set for subscriptions
    ...additionalContext
  } = contextParams;

  if (connection) {
    return buildCommonContext<UserObjectType>(connection.context.req, additionalContext);
  }

  const login = ({ authenticateOptions, user }: LoginParams): Promise<void> => (
    loginPromise({ authenticateOptions, user, request: req })
  );

  const authenticate = ({ authenticateOptions, strategyName }: AuthenticateParams): Promise<AuthenticateReturn> => (
    authenticatePromise({
      authenticateOptions,
      request: req,
      response: res,
      strategyName,
    })
  );

  // The UserObject is without the any in conflict: "'User' is not assignable to type 'UserObjectType'"
  const sharedContext = buildCommonContext<UserObjectType>(req as any, additionalContext);
  return {
    ...sharedContext,
    authenticate,
    login,
    logout: () => req.logout(),
    res,
  };
};

export default buildContext;
