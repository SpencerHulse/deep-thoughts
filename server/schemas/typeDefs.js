// Import the GQL tagged template function
const { gql } = require("apollo-server-express");

// Create typeDefs
// There are two passages to access APIs: queries and mutations
// Queries = GET, Mutations = POST, PUT, DELETE
const typeDefs = gql`
  type Query {
    helloWorld: String
  }
`;

// Export
module.exports = typeDefs;
