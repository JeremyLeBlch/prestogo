import { gql } from "@apollo/client";

export const GET_CITIES = gql`
    query Cities {
        cities {
        id
        name
        coordinates {
            latitude
            longitude
        }
        }
    }
`;

export const GET_CITY = gql`
    query City ($cityId: Int!) {
    city(id: $cityId) {
        id
        name
        coordinates {
        latitude
        longitude
        }
        weather {
        forecast {
            condition
            date
            temperature
        }
        }
        restaurants {
        name
        description
        cuisines {
            label
        }
        }
    }
    }
`