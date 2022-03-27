import User from "../interfaces/User";

export enum UserActionType {
    GET_USERS_PENDING = "GET_USERS_PENDING",
    GET_USERS_SUCCESS = "GET_USERS_SUCCESS",
    GET_USERS_FAIL = "GET_USERS_FAIL"
}

interface UserActionPending {
    type: UserActionType.GET_USERS_PENDING
}

interface UserActionSuccess {
    type: UserActionType.GET_USERS_SUCCESS
    payload: User[];
}

interface UserActionFail {
    type: UserActionType.GET_USERS_FAIL
    payload?: (Error | null);
}

export type UserAction = (UserActionPending | UserActionSuccess | UserActionFail)
