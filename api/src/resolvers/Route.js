function climbedBy(parent, args, context) {
  return context.prisma.route({ id: parent.id }).climbedBy();
}
function signatures(parent, args, context) {
  return context.prisma.route({ id: parent.id }).signatures();
}
module.exports = {
  climbedBy,
  signatures
};
