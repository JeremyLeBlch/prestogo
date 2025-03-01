export interface City {
    id: number
    name: string
    coordinates: Coordinate
}

export interface Coordinate {
    latitude: number
    longitude: number
}

export interface Forecast {
    condition: string
    temperature: number
    date: string
}

export interface Restaurant {
    name: string
    description: string
    cuisines: { label: string }[]
}