import { GraphQLError } from "graphql/error";

export default {
    createCity: (_, { data }, { prisma }) => prisma.city.create({ data }),
    updateCity: (_: any, {data}: any, {prisma}) => prisma.city.update({where: {id: data.id}, data}),
    deleteCity: (_: any, {id, postcode}: { id: number, postcode: string }, {prisma}) => {
        // Check if the user provided an id or a postcode
        if (!id && !postcode) {
          throw new GraphQLError("You must provide either an id or a postcode in order to delete a city.", {
            extensions: {
              code: "BAD_USER_INPUT"
            }
          });
        }
        // Set the where condition based on the provided id or postcode
        const where = id ? {id} : {postcode};
        // Delete the city
        return prisma.city.delete({where});
      }
}