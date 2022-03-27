import User from "../interfaces/User";

export enum UserBoxListActionType {
    SELECT_USER = "SELECT_USER"
}

interface UserBoxListActionSelect {
    type: UserBoxListActionType.SELECT_USER,
    payload: User | null
}

export type UserBoxListAction = (UserBoxListActionSelect)
