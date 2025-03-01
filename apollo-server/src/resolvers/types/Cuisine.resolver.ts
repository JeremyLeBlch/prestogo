export default {
    restaurants: ({id}, _, { datasources }) => datasources.cuisine.getRelated(id, "restaurants")
  }