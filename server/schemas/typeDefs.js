// Import the GQL tagged template function
const { gql } = require("apollo-server-express");

// Create typeDefs
// There are two passages to access APIs: queries and mutations
// Queries = GET, Mutations = POST, PUT, DELETE
const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    friendCount: Int
    thoughts: [Thought]
    friends: [User]
  }

  type Thought {
    _id: ID
    thoughtText: String
    createdAt: String
    username: String
    reactionCount: Int
    reactions: [Reaction]
  }

  type Reaction {
    _id: ID
    reactionBody: String
    createdAt: String
    username: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    thoughts(username: String): [Thought]
    thought(_id: ID!): Thought
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
  }
`;

// Export
module.exports = typeDefs;

/* The (username: String) is a POSSIBLE parameter that can be used,
but it is not required */

// The ! after a query parameter means it must exist for the query to be carried out
// Didn't do it for all thoughts or users because we simply return all of them
// For a single thought or user, we must know which we are looking for, so it must exist

// Example - login mutation required email/password and returns a User object
