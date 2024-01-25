import {
    ColumnType,
    Generated,
    Insertable,
    Selectable,
    Updateable
} from 'kysely'

export interface Database {
    users: UserTable
}

export interface UserTable {
    id: Generated<string>
    name: string
    email: string
    created_at: ColumnType<Date, string | undefined, never>
}

export type UserResult = Selectable<UserTable>
export type UserInsert = Insertable<UserTable>
export type UserUpdate = Updateable<UserTable>