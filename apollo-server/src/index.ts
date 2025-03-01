import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import WeatherAPI from "./datasources/WeatherAPI";

import typeDefs from "./schemas";
import resolvers from "./resolvers";

// Importing dataset and data soures~
import { RESTDataSource } from "@apollo/datasource-rest";
import CityDataSource from "./datasources/CityDataSource";
import IDataSource from "./datasources/DataSource.interface";
import RestaurantDataSource from "./datasources/RestaurantDataSource";
import PrismaDataSource from "./datasources/PrismaDataSource";
import PersonDataSource from "./datasources/PersonDataSource";

interface Context {
    datasources: { [key: string]: RESTDataSource | IDataSource }
}

// Creating a new server~
const server = new ApolloServer<Context>({ typeDefs, resolvers });

// > IIFE (https://developer.mozilla.org/en-US/docs/Glossary/IIFE)
(async () => {
    console.log("Launching Apollo Server...");

    const { url } = await startStandaloneServer(server, {
        listen: { port: 4005 },
        context: async () => {
            const { cache } = server;
            return { 
                datasources: { 
                    weather: new WeatherAPI({ cache }), 
                    city: new CityDataSource(), // new PrismaDataSource("city"),
                    restaurant: new RestaurantDataSource(), // new PrismaDataSource("restaurant")
                    manager: new PrismaDataSource("manager"),
                    cuisine: new PrismaDataSource("cuisine"),
                    person: new PersonDataSource()
                }
            }
        }
    });

    console.log(`Server ready at: ${url} `)
})()

// #1 "getOne(1)": RESULTAT
// #2 "getOne(2)": RESULTAT
// "getOne(1)" "#1 getOne(1)"
// "getOne(2)" "#2 getOne(2)"
// "getOne(1)" --> "#1 getOne(1)"
// "getOne(2)" "#2 getOne(2)"
// "getOne(1)" --> "#1 getOne(1)"
// "getMany(where: {id: 5}))"
// "getMany(where: {id: 6}))"
// "getMany(where: {id: 6}))"