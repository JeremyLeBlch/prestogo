export default {
    createManager: (_, { data }, { prisma }) => prisma.manager.create({ data }),
    updateManager: (_: any, {data}: any, {prisma}) => prisma.manager.update({where: {id: data.id}, data}),
    deleteManager: (_, args, context) => {
        return context.prisma.manager.delete({ where: { id: args.id }});
    }
}