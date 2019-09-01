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

const opts = {
  cors: {
    credentials: true,
    origin: "http://localhost:3000"
  }
};

server.start(
  {
    cors: {
      credentials: true,
      origin: "http://localhost:3000",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      preflightContinue: false,
      optionsSuccessStatus: 204
    }
  },
  server => {
    console.log(`Server is running on http://localhost/4000`);
  }
);
