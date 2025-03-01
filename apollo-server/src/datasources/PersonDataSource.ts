import { GraphQLError } from "graphql/error";
import DataLoader from "dataloader";

import people from "../dataset/people";
import { Person } from "../dataset/types";
import IDataSource from "./DataSource.interface";

class PersonDataSource implements IDataSource {
    async getOne(id: number): Promise<any> {
        return await this.loaders.loadOne.load(id);
    }

    async getMany(where?: any): Promise<any[]> {
        console.log("[PERSON] Retrieving all the instances.");
        return people;
    }

    async getRelated(id: number, relation: string): Promise<any> {
       throw new Error("Method not implemented.");
    }

    private findOne(id: number) {
        console.log("[PERSON] Retrieving the instance with identifier:: ", id);
        const person = people.find(person => person.id === id);
        if (!person) {
            throw new GraphQLError(`[PERSON] Unable to retrieve instance with identifier: ${id}`, {
                extensions: {
                code: "BAD_USER_INPUT",
                http: {
                    status: 404
                }
                }
            });  
        }
        return person;
    }

    private loaders = {
        loadOne: new DataLoader(identifiers => {
            return Promise.all(identifiers.map((id: number) => this.findOne(id)));
        })
    }

}

export default PersonDataSource;