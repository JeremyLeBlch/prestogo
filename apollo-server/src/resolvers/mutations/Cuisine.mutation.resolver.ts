import { GraphQLError } from "graphql/error";

export default {
  createCuisine: (_: any, {data}: any, {prisma}) => prisma.cuisine.create({data}),
  deleteCuisine: (_: any, {id, label}: { id: number, label: string }, {prisma}) => {
    if (!id && !label) {
      throw new GraphQLError("You must provide either an id or a label in order to delete a cuisine.",
        {
          extensions: {
            code: "BAD_USER_INPUT"
          }
        });
    }
    const where = id ? {id} : {label};
    return prisma.cuisine.delete({where});
  }
};