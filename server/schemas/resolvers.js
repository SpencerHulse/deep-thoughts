// Resolvers serve the response for typeDefs (Queries/Mutations)
const resolvers = {
  Query: {
    helloWorld: () => {
      return "Hello world!";
    },
  },
};

module.exports = resolvers;
