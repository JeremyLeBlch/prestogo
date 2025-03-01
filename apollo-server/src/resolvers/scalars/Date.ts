import { GraphQLScalarType, Kind } from "graphql";

// Create a new custom scalar type for GraphQL
const ScalarDate = new GraphQLScalarType({
  // Define the name of the custom scalar type
  name: "Date",
  // Provide a description for this custom scalar type
  description: "Date custom scalar type",
  // Define the method to use to serialize the custom scalar type
  // When returning data to the client, GraphQL uses the serialize function
  serialize(value) {
    // Check if the value that is to be serialized is an instance of JavaScript Date
    // If so, convert it to an ISO string format
    if (value instanceof Date) {
      return value.toISOString();
    }
    // Throw an error if the value is not a Date object
    throw Error("GraphQL Date Scalar serializer expected a `Date` object");
  },
  // Define the method to use to parse a value received from the client
  // When receiving data from the client, GraphQL uses the parseValue function
  parseValue(value) {
    // Check if the value is a number type
    // If it is, convert it to a Date object
    if (typeof value === "number") {
      return new Date(value); // Convert incoming integer to Date
    }
    // Throw an error if the value is not a number
    throw new Error("GraphQL Date Scalar parser expected a `number`");
  },
  // Define the method to use to parse a literal AST value received from the client
  // When receiving data from the client inline, GraphQL uses the parseLiteral function
  parseLiteral(value) {
    // Check if the value is an integer type
    // If it is, convert it to a Date object
    if (value.kind === Kind.INT) {
      return new Date(parseInt(value.value, 10));
    }
    // Return null if the value is not an integer
    return null;
  }
});

export default ScalarDate;
