import { Person } from "../dataset/types";

import { cacheControlFromInfo } from '@apollo/cache-control-types';

export default {
    hello: (): string => "Hello world!",
    people: (_, __, { datasources }): Person[] => datasources.person.getMany(),
    person: (_, args, { datasources }) => datasources.person.getOne(args.id),
    restaurants: (_, { where }, { datasources }) => datasources.restaurant.getMany(where),
    restaurant: (_, args, { datasources }) => datasources.restaurant.getOne(args.id),
    managers: (_, { where }, { datasources }) => datasources.manager.getMany(where),
    manager: (_, args, { datasources }, info) => {
        info.cacheControl?.setCacheHint({ maxAge: 480 });
        return datasources.manager.getOne(args.id)
    } ,
    cities: (_, { where }, { datasources }) => datasources.city.getMany(where),
    city: (_, args, {datasources}) => datasources.city.getOne(args.id),
    cuisines: (_, __, { datasources }) => datasources.cuisine.getMany() // Cuisine[] (Prisma) -> [Cuisine] (GraphQL).
}