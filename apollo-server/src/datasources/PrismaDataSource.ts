import { GraphQLError } from "graphql";
import prisma from "../../prisma/client";
import IDataSource from "./DataSource.interface";
import DataLoader from "dataloader";

class PrismaDataSource implements IDataSource {
    protected model: any;
    private readonly entity: string;

    constructor(model: string) {
        this.model = prisma[model];
        this.entity = model.toUpperCase();
    }

    private loaders = {
        loadOne: new DataLoader((identifiers: number[]) => {
            console.log("Identifiers", identifiers);
            return Promise.all(identifiers.map((id: number) => this.findOne(id)));
        }),
        loadMany: new DataLoader((wheres: any[]) =>
          Promise.all(wheres.map(where => this.findMany(where))), {cacheKeyFn: JSON.stringify}),
        loadRelated: new DataLoader((options: any[]) =>
          Promise.all(options.map(option => this.findRelated(option.id, option.relation))), {cacheKeyFn: JSON.stringify})
      };

    // 1 + identifiers <> The findOne method will only be called once with this id.
    // 2 + identifiers <> The findOne method will only be called once with this id.
    // 1 -- Reference to the first "1" key.
    // 1 -- Reference to the first "1" key.
    /*
        loadedIdentifiers = [1, 2, 1, 1, 2, 1, 1]
        identifiers = [1, 2] (Set of loadedIdentifiers)
        resultats = {
            1: resultat1
            2: resultat2
        }
        finalResults = loadedIdentifiers.map(id => resultats[id])

        loadedWheres = [{ where: { id: 5}}, { where: { name: "ABC" }}, { where: { name: "ABC" }}, { where: { name: "ABC" }}]
        wheres = [{ where: { id: 5}}, '{"where":{"id":5}}']
        resulats = {
            '{"where":{"id":5}}': resultat1,
            '{ where: { name: "ABC" }}': resultat2
        }
        finalResults = loadedWheres.map(where => resultats[where])
    */
    
    async getOne(id: number): Promise<any> {
        return await this.loaders.loadOne.load(id);
    }

    async getMany(where?: any): Promise<any[]> {
        return await this.loaders.loadMany.load(where || {});
    }

    async getRelated(id: number, relation: string): Promise<any> {
        return await this.loaders.loadRelated.load({ id, relation });
    }

    private findOne(id: number) {
        console.log(`[${this.entity}] Retrieving the instance with identifier: ${id}`);
        // Example:  [CITY] Retrieving the instance with identifier: 1
        try {
            return this.model.findUnique({ where: { id } });
        } catch (error) {
            const message = `[${this.entity}] Unable to retrieve the instance with identifier: ${id}`;
            console.error(error);
            console.error(message);
            throwError(message);
        }
    }

    private findMany(where?: any) {
        console.log(`[${this.entity}] Retrieving instances with the where clause provided`);
        console.log(where || "No where clause provided");
        try {
            return this.model.findMany({ where });
        } catch (error) {
            const message = `[${this.entity}] Unable to retrieve instances with the where clause provided`;
            console.error(error);
            console.error(message);
            throwError(message);
        }
    }

    private findRelated(id: number, relation: string) {
        console.log(`[${this.entity}] Retrieving the related instances of ${relation} from the instance with identifier: ${id}`);
        try {
            return this.model.findUnique({ where: { id }})[relation]();
            // Example: prisma.city.findUnique({ where: { id: 1 }}).restaurants() // cityDS.getRelated(1, "restaurants")
        } catch (error) {
            const message = `[${this.entity}] Unable to retrieve the related instances of ${relation} from the instance with identifier: ${id}`;
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

export default PrismaDataSource;

