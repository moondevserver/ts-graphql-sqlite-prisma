export const userTypeDefs = `#graphql
  type User {
    id: Int!
    email: String!
    name: String
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    users: [User!]!
    user(id: Int!): User
  }

  type Mutation {
    createUser(email: String!, name: String): User!
    updateUser(id: Int!, email: String, name: String): User!
    deleteUser(id: Int!): User
  }
`;
