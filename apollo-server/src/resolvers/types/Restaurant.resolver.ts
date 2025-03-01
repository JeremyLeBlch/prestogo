import { Restaurant } from "@prisma/client";

export default {
    city: (parent: Restaurant, _, { datasources }) => {
        return datasources.city.getOne(parent.cityId)
    },
    manager: (parent: Restaurant, _, { datasources })=> {
        return datasources.manager.getOne(parent.managerId)
    },
    cuisines: (parent: Restaurant, _, { datasources }) => {
        return datasources.restaurant.getRelated(parent.id, "cuisines");
    }
};