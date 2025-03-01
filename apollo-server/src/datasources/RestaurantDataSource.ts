import PrismaDataSource from "./PrismaDataSource";

class RestaurantDataSource extends PrismaDataSource {
    constructor() {
        super("restaurant")
    }
}

export default RestaurantDataSource;