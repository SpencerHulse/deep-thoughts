// Import the GQL tagged template function
const { gql } = require("apollo-server-express");

// Create typeDefs
// There are two passages to access APIs: queries and mutations
// Queries = GET, Mutations = POST, PUT, DELETE
const typeDefs = gql`
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

  type Query {
    thoughts(username: String): [Thought]
  }
`;

// Export
module.exports = typeDefs;

/* The (username: String) is a POSSIBLE parameter that can be used,
but it is not required */
