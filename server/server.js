const express = require("express");
// Importing ApolloServer
const { ApolloServer } = require("apollo-server-express");
// Importing typeDefs and Resolvers
const { typeDefs, resolvers } = require("./schemas"); // Connection to database
const db = require("./config/connection");

const PORT = process.env.PORT || 3001;
const app = express();

const { authMiddleware } = require("./utils/auth");
const startServer = async () => {
  // Creating a new Apollo server and passing in schema data
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    // Didn't work with the below... until 21.2.5
    context: authMiddleware,
  });

  // Starting the Apollo server
  await server.start();

  // Integrating the Apollo server with the Express app as middleware
  server.applyMiddleware({ app });

  // Logging where the GQL API can be tested
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
};

// Initializing the Apollo server
startServer();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Forming a connection to the DB, then starting the server
db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
