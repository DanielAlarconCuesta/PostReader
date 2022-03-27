import { SessionAction, SessionActionType } from "../actions/sessionActions";
import Client from "../interfaces/Client"

interface State {
    client: Client | null;
}

const initialState: State = {
    client: null,
}

export const sessionReducer = (state: State = initialState, action: SessionAction) => {

    switch(action.type) {
        case SessionActionType.CREATE_SESSION:
            return {
                client: action.payload
            }

        case SessionActionType.REMOVE_SESSION:
            return {
                client: null
            }

        default: 
            return state;
    }
}
