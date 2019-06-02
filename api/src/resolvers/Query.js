function routeList(root, args, context, info) {
  return context.prisma.routes();
}

function user(root, args, context, info) {
  return context.prisma.user({ email: args.email });
}

module.exports = {
  routeList,
  user
};
