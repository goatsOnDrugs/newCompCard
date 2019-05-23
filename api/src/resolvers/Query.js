function routeList(root, args, context, info) {
  return context.prisma.routes()
}

module.exports = {
  routeList,
}
