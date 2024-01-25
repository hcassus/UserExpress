import { User } from './user';
import { addRepositoryUser, getRepositoryUsers } from './user_repository';
import { response } from 'express';

const users: User[] = [];

export async function addUser(user: User): Promise<string | void> {
    return validateUser(user)
        .then(addRepositoryUser)
        .then(
            (user) => user.id
        )
        .catch(
            (err) => {
                if(err.message.includes("users_email_key")){
                    throw new Error("User already exists")
                }
            }
        );
}

export async function getUsers(): Promise<User[]> {
    console.log('Getting Users');
    return getRepositoryUsers();
}

async function validateUser(user: User): Promise<User> {
    if(!user.name || !user.email){
        const msg = "Invalid User"
        console.error(msg)
        return Promise.reject(msg)
    }
    return user
}

