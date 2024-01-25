import { User } from './user';
import { db } from './database';
import { UserResult } from './types';
export async function getRepositoryUsers(): Promise<User[]>{
    return db
        .selectFrom('users')
        .selectAll()
        .execute()
        .then(toDomainUsers)
}

export async function addRepositoryUser(user: User) : Promise<User> {
    const values = {
        name: user.name,
        email: user.email
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
    return new User(
        row.id,
        row.name,
        row.email,
        row.created_at
    );
}