import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { join, dirname } from "path";

// Get the path of the current file from its URL.
const __filename = fileURLToPath(import.meta.url);
// Get the repository path from the file's path.
const __dirname = dirname(__filename);

const configuration: { [key: string]: { repository: string, files: string[]  }} = {
    directives: {
        repository: "./directives",
        files: ["CacheControl"]
    },
    types: {
        repository: "./types",
        files: ["Weather", "City", "Cuisine", "Manager", "Restaurant", "Person"]
    },
    queries: {
        repository: "./",
        files: ["Query"]
    },
    mutations: {
        repository: "./",
        files: ["Mutation"]
    }
};

// Read uses the configuration object (above), and extract the repository and files using the provided key.
function read(key: string) {
    const { repository, files } = configuration[key]; /* {
        repository: "./types",
        files: ["City", "Cuisine", "Manager", "Restaurant", "Person"]
    } */
    // Construct a string, mapping on each file, and reading it (using the repository to build the path).
    return files.map((file: any) => readFileSync(join(__dirname, repository, `${file}.graphql`))).join("\n");
}


const directives = read("directives");
const types = read("types");
const queries = read("queries");
const mutations = read("mutations");

// Construct the combined GraphQL schema from individual parts.
export default `#graphql
${directives}
${types}
${queries}
${mutations}
`;
