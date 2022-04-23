const { AuthenticationError } = require("apollo-server-express");
const { User, Thought } = require("../models");
const { signToken } = require("../utils/auth");

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
    // Get single thought by id
    thought: async (parent, { _id }) => {
      return Thought.findOne({ _id });
    },
    // Get all users
    users: async () => {
      return User.find()
        .select("-__v -password")
        .populate("friends")
        .populate("thoughts");
    },
    // Get single user by username
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select("-__v -password")
        .populate("friends")
        .populate("thoughts");
    },
    // Me for the JWT
    me: async (parent, args, context) => {
      // Check for context.user (JWT)
      if (context.user) {
        const userData = await User.findOne({})
          .select("-__v -password")
          .populate("thoughts")
          .populate("friends");

        return userData;
      }
      throw new AuthenticationError("Not logged in");
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }
      // Sign token using the user data and return both
      const token = signToken(user);
      return { token, user };
    },

    addThought: async (parent, args, context) => {
      if (context.user) {
        const thought = await Thought.create({
          ...args,
          username: context.user.username,
        });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { thoughts: thought._id } },
          { new: true }
        );

        return thought;
      }

      throw new AuthenticationError("You need to be logged in!");
    },

    addReaction: async (parent, { thoughtId, reactionBody }, context) => {
      if (context.user) {
        const updatedThought = await Thought.findOneAndUpdate(
          { _id: thoughtId },
          {
            $push: {
              reactions: { reactionBody, username: context.user.username },
            },
          },
          { new: true, runValidators: true }
        );

        return updatedThought;
      }

      throw new AuthenticationError("You need to be logged in!");
    },

    addFriend: async (parent, { friendId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { friends: friendId } },
          { new: true }
        ).populate("friends");

        return updatedUser;
      }

      throw new AuthenticationError("You need to be logged in!");
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
