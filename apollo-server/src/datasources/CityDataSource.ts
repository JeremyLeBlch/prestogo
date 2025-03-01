import { GraphQLError } from "graphql";
import prisma from "../../prisma/client";
import IDataSource from "./DataSource.interface";

class CityDataSource implements IDataSource {
    getOne(id: number) {
        console.log(`[CITY] Retrieving the instance with identifier: ${id}`)
        try {
            return prisma.city.findUnique({ where: { id }});
        } catch (error) {
            const message = `[CITY]] Unable to retrieve the instance with identifier: ${id}`;
            console.error(error);
            console.error(message);
            throwError(message);
        }
    }

    getMany(where?: any): Promise<any[]> {
        console.log(`[CITY] Retrieving instances with the where clause provided`);
        console.log(where || "No where clause provided");
        try {
            return prisma.city.findMany({ where });
        } catch (error) {
            const message = `[CITY] Unable to retrieve instances with the where clause provided`;
            console.error(error);
            console.error(message);
            throwError(message);
        }
    }

    getRelated(id: number, relation: string): Promise<any> {
        console.log(`[CITY] Retrieving the related instances of ${relation} from the instance with identifier: ${id}`);
        try {
            return prisma.city.findUnique({ where: { id }})[relation]();
            // Example: prisma.city.findUnique({ where: { id: 1 }}).restaurants() // cityDS.getRelated(1, "restaurants")
        } catch (error) {
            const message = `[CITY] Unable to retrieve the related instances of ${relation} from the instance with identifier: ${id}`;
            console.error(error);
            console.error(message);
            throwError(message);
        }
    }
}

function throwError(message: string) {
    throw new GraphQLError(message, {
        extensions: {
            code: "BAD_USER_INPUT",
            http: {
                status: 400
            }
        }
    });
}

export default CityDataSource;