import { Person } from "../../dataset/types";


export default {
    // The parent argument correspond to the current queried person.
    partner: (parent: Person, _, { datasources }): Person => { 
        return datasources.person.getOne(parent.partner);
    },
    age: (parent: Person): number => Math.floor((new Date().getTime() - new Date(parent.birthdate).getTime()) / 31557600000)
    // 31557600000 = 1000 milliseconds * 60 seconds * 60 minutes * 24 hours * 365.25 days
};