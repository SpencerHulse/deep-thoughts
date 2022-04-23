const { User, Thought } = require("../models");

// Resolvers serve the response for typeDefs (Queries/Mutations)
const resolvers = {
  Query: {
    /* Parent is more of a placeholder, allowing us to access the username second parameter */
    thoughts: async (parent, { username }) => {
      /* Const passes a username or empty object */
      const params = username ? { username } : {};
      /* Find thoughts, and sort in descending order of creation */
      return Thought.find(params).sort({ createdAt: -1 });
    },
  },
};

module.exports = resolvers;

/* resolvers can accept four arguments in the following order:

parent - when using nested resolvers to handle complicated actions
  holds reference to the resolver that executed the nested resolver function
  not needed here, but it must come first anyway

args - object of all values passed into a query or mutation request as params
  above, username is destructured out

context - used to make data accessible by all resolvers,
  such as logged-in status or API access token

info - extra info about operation's current state (not common)
*/
