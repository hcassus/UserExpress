import {User} from './user'
import { addDBUser, getDBUsers } from './user_repository';

const users : User[] = []
export async function addUser(user: User) : Promise<User> {
    console.log('Adding User ' + user.username);
    addDBUser(user)
    return user
}

export async function getUsers() : Promise<User[]> {
    console.log('Getting Users');
    return getDBUsers();
}

