const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { APP_SECRET, getUserId } = require("../utils");

async function signup(parent, args, context, info) {
  // encrypting the password
  const password = await bcrypt.hash(args.password, 10);
  // store user in database with prisma client
  const user = await context.prisma.createUser({
    ...args,
    password,
    routes: {
      create: [
        {
          title: "Advanced 1",
          attempts: 0,
          points: 2100
        },
        {
          title: "Advanced 2",
          attempts: 0,
          points: 2200
        },
        {
          title: "Advanced 3",
          attempts: 0,
          points: 2300
        },
        {
          title: "Advanced 4",
          attempts: 0,
          points: 2400
        },
        {
          title: "Advanced 5",
          attempts: 0,
          points: 2500
        },
        {
          title: "Advanced 6",
          attempts: 0,
          points: 2600
        },
        {
          title: "Advanced 7",
          attempts: 0,
          points: 2700
        },
        {
          title: "Advanced 8",
          attempts: 0,
          points: 2800
        },
        {
          title: "Advanced 9",
          attempts: 0,
          points: 2900
        },
        {
          title: "Advanced 10",
          attempts: 0,
          points: 3000
        }
      ]
    }
  });
  // generating a JWT and signing it with an APP_SECRET
  const token = jwt.sign({ userId: user.id }, APP_SECRET);
  return {
    token,
    user
  };
}

async function login(parent, args, context, info) {
  // use prisma client to retrieve user based on email
  const user = await context.prisma.user({ email: args.email });
  if (!user) {
    throw new Error("No such user found");
  }
  // comparing passwords
  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error("Invalid password");
  }
  const token = jwt.sign({ userId: user.id }, APP_SECRET);
  return {
    token,
    user
  };
}

function post(parent, args, context, info) {
  const userId = getUserId(context);
  return context.prisma.createRoute({
    title: args.title,
    points: args.points,
    attempts: args.attempts,
    climbedBy: { connect: { id: userId } }
  });
}

function updateRouteAttempts(parent, args, context, info) {
  return context.prisma.updateRoute({
    data: { attempts: args.attempts },
    where: { id: args.id }
  });
}

function updateUser(parent, args, context, info) {
  return context.prisma.updateUser({
    data: {
      firstName: args.firstName,
      lastName: args.lastName,
      email: args.email
    },
    where: { id: args.id }
  });
}
// route: { connect: { id: args.routeId } }

module.exports = {
  signup,
  login,
  post,
  updateRouteAttempts,
  updateUser
};
