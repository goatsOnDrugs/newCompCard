function routeList(root, args, context, info) {
  return context.prisma.routes();
}

function user(root, args, context, info) {
  return context.prisma.user({ email: args.email });
}

function route(root, args, context, info) {
  return context.prisma.route({ id: args.id });
}
module.exports = {
  routeList,
  user,
  route
};
