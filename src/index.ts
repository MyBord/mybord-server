import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import http from 'http';
import passport from 'passport';
import session from 'express-session';
import uuid from 'uuid/v4';
import { GraphQLLocalStrategy, buildContext } from 'graphql-passport';
import Users from './users';
import resolvers from './resolvers';
import typeDefs from './typeDefs';

passport.serializeUser((user, done) => {
  // @ts-ignore
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const users = Users.getUsers();
  const matchingUser = users.find((user) => user.id === id);
  done(null, matchingUser);
});

passport.use(
  new GraphQLLocalStrategy((email, password, done) => {
    const users = Users.getUsers();
    const matchingUser = users.find((user) => email === user.email && password === user.password);
    const error = matchingUser ? null : new Error('no matching user');
    done(error, matchingUser);
  }),
);

const server = new ApolloServer({
  context: ({ req, res }) => buildContext({ req, res, Users }),
  resolvers,
  typeDefs,
  playground: {
    settings: {
      'request.credentials': 'same-origin',
    },
  },
});

export default server;

// Adds express as middleware to our server.
const app = express();
app.use(session({
  // cookie: { secure: true }, // cookie must be sent via https
  genid: (request) => uuid(), // generates a session ID
  resave: false,
  saveUninitialized: false,
  secret: 'bad secret', // secret that is needed to sign the cookie
}));

app.use(passport.initialize());
app.use(passport.session());

server.applyMiddleware({ app });

const PORT = 4000;

// We create an http server from our apollo server.
const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

// We run our http server.
httpServer.listen(PORT, () => {
  console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  console.log(`Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`);
});

// Using webpack's hot module replacement, if needed.
if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => server.stop());
}
