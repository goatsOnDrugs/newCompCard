function routes(parent, args, context) {
  return context.prisma.user({ id: parent.id }).routes()
}

module.exports = {
  routes,
}
