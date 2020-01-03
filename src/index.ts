import uuid from 'uuid/v4';
import express from 'express';
import session from 'express-session';
import { ApolloServer } from 'apollo-server-express';
import passport from 'passport';
import { GraphQLLocalStrategy, buildContext } from 'graphql-passport';
import User from './db';
import resolvers from './server/sampleResolvers';
import typeDefs from './server/sampleTypeDefs';

const PORT = 4000;
passport.serializeUser((user, done) => {
  // @ts-ignore
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const users = User.getUsers();
  const matchingUser = users.find((user) => user.id === id);
  done(null, matchingUser);
});
passport.use(
  new GraphQLLocalStrategy((email, password, done) => {
    // Adjust this callback to your needs
    const users = User.getUsers();
    const matchingUser = users.find(
      (user) => email === user.email && password === user.password,
    );
    const error = matchingUser ? null : new Error('no matching user');
    done(error, matchingUser);
  }),
);

const app = express();
app.use(session({
  genid: (req) => uuid(),
  secret: 'bad secret',
  resave: false,
  saveUninitialized: false,
  // use secure cookies for production meaning they will only be sent via https
  // cookie: { secure: true }
}));
app.use(passport.initialize());
app.use(passport.session()); // if session is used

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => buildContext({ req, res, User }),
});

server.applyMiddleware({ app, cors: false });

app.listen({ port: PORT }, () => {
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`,
  );
});
