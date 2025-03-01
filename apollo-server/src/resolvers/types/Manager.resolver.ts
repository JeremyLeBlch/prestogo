import { Manager } from "@prisma/client";

export default {
    fullname: (parent: Manager) => `${parent.firstname} ${parent.lastname}`,
    restaurants: (parent: Manager, _, { datasources }) => datasources.manager.getRelated(parent.id, "restaurants")
}