const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { APP_SECRET, getUserId } = require("../utils")

async function signup(parent, args, context, info) {
  // encrypting the password
  const password = await bcrypt.hash(args.password, 10)
  // store user in database with prisma client
  const user = await context.prisma.createUser({ ...args, password })
  // generating a JWT and signing it with an APP_SECRET
  const token = jwt.sign({ userId: user.id }, APP_SECRET)
  return {
    token,
    user,
  }
}

async function login(parent, args, context, info) {
  // use prisma client to retrieve user based on email
  const user = await context.prisma.user({ email: args.email })
  if (!user) {
    throw new Error("No such user found")
  }
  // comparing passwords
  const valid = await bcrypt.compare(args.password, user.password)
  if (!valid) {
    throw new Error("Invalid password")
  }
  const token = jwt.sign({ userId: user.id }, APP_SECRET)
  return {
    token,
    user,
  }
}

function post(parent, args, context, info) {
  const userId = getUserId(context)
  return context.prisma.createRoute({
    title: args.title,
    points: args.points,
    attempts: args.attempts,
    climbedBy: { connect: { id: userId } },
  })
}
module.exports = {
  signup,
  login,
  post,
}
