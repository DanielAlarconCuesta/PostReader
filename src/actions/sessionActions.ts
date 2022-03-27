import Client from "../interfaces/Client";

export enum SessionActionType {
    CREATE_SESSION = "CREATE_SESSION",
    REMOVE_SESSION = "REMOVE_SESSION"
}

interface SessionActionCreate {
    type: SessionActionType.CREATE_SESSION,
    payload: Client | null
}

interface SessionActionRemove {
    type: SessionActionType.REMOVE_SESSION
}

export type SessionAction = (SessionActionCreate | SessionActionRemove)
