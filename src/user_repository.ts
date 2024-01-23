import { User } from './user';
import { db } from './database';
import { UserResult, UserInsert } from './types';
export async function getDBUsers(): Promise<User[]>{
    return db
        .selectFrom('users')
        .selectAll()
        .execute()
        .then(toDomainUsers)
}

export async function addDBUser(user: User) : Promise<User> {
    const values = {
        username: user.username
    }

    return db
        .insertInto('users')
        .values(values)
        .returningAll()
        .executeTakeFirstOrThrow()
        .then(toDomainUser)
}
function toDomainUsers(result: UserResult[]) {
    return result.map(toDomainUser);
}
function toDomainUser(row: UserResult) {
    console.log("Mapping user to domain: " + row)
    return new User(
        row.id,
        row.username
    );
}