import Person from "./types/Person.resolver";
import Restaurant from "./types/Restaurant.resolver";
import City from "./types/City.resolver";
import Manager from "./types/Manager.resolver"
import Cuisine from "./types/Cuisine.resolver";
import Query from "./Query.resolver";
import Mutation from "./mutations";

import Date from "./scalars/Date";

export default {
    Date,
    Person,
    Restaurant,
    City,
    Manager,
    Query,
    Mutation
}