export default {
    createRestaurant: (_, { data }, { prisma }) => {
        const restaurant = connectCuisines(data);
        return prisma.restaurant.create({ data: restaurant });
    },
    updateRestaurant: (_, { data }, { prisma }) => {
        const restaurant = connectCuisines(data);
        return prisma.restaurant.update({ where: { id: restaurant.id }, data: restaurant });
    },
    deleteRestaurant: (_, args, context) => {
        return context.prisma.restaurant.delete({ where: { id: args.id }});
    }
}

function connectCuisines(data) {
    const { cuisinesIds, ...restaurant } = data;
    if (cuisinesIds && cuisinesIds.length) {
        restaurant.cuisines = { connect: cuisinesIds.map((id: number) => ({ id }))}
    }
    return restaurant;
}
