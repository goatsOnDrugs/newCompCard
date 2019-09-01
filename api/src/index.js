const { GraphQLServer } = require("graphql-yoga");
const { prisma } = require("./generated/prisma-client");
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const User = require("./resolvers/User");
const Route = require("./resolvers/Route");

const resolvers = {
  Query,
  Mutation,
  User,
  Route
};

// 3
const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  // the resolvers define the IMPLEMENTATION
  resolvers,
  context: request => {
    return {
      ...request,
      prisma
    };
  }
});
server.start(() =>
  console.log("server is up and running on port 4000, woohoo!")
);
