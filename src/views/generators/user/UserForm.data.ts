import {LibUser} from "../../../models/generators.model";

const todayString = new Date().toISOString();

export const userBlueprint: LibUser = {
    library: {
        id: "placeholder",
        name: "placeholder"
    },
    userId: Date.now().toString(),
    createdAt: todayString,
    updatedAt: todayString,
    age: 3,
    firstName: "John",
    lastName: "Smith",
    username: "johnnyS",
    email: "john.smith@testmail.com",
    status: 'ACTIVE'

}
