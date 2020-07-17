import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type User {
    id: String
    firstName: String
    lastName: String
    email: String
  }
  type Query {
    isAuthenticated: Boolean
  }
  type AuthPayload {
    user: User
  }
  type Mutation {
    loginUser(email: String!, password: String!): AuthPayload
  }
`;

export default typeDefs;
