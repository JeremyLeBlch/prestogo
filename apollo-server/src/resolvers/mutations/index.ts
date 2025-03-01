import RestaurantMutations from "./Restaurant.mutation.resolver";
import CityMutations from "./City.mutation.resolver";
import ManagerMutations from "./Manager.mutation.resolver";
import CuisineMutations from "./Cuisine.mutation.resolver";

export default {
    ...RestaurantMutations,
    ...CityMutations,
    ...ManagerMutations,
    ...CuisineMutations
}