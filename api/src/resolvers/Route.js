function climbedBy(parent, args, context) {
  return context.prisma.route({ id: parent.id }).climbedBy();
}

module.exports = {
  climbedBy
};
