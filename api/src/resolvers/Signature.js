function author(parent, args, context) {
  return context.prisma.user({ id: args.userId }).author();
}
function route(parent, args, context) {
  return context.prisma.route({ id: args.routeId }).route();
}

module.exports = {
  author,
  route
};
