import { UserAction, UserActionType } from "../actions/userActions"
import User from "../interfaces/User";

interface State {
    users: User[];
    loading: boolean;
    error?: (Error | null);
}

const initialState = {
    users: [],
    loading: false, 
    error: null 
}

export const userReducer = (state: State = initialState, action: UserAction):State => {
    
    switch(action.type) {
        case UserActionType.GET_USERS_PENDING:
            return {
                ...state,
                loading: true 
            } 

        case UserActionType.GET_USERS_SUCCESS:
            return {
                loading: false,
                users: [...action.payload]
            }

        case UserActionType.GET_USERS_FAIL:
            return {
                ...state,
                users: [],
                loading: false,
                error: action.payload 
            }

        default: 
            return state;
    }
}
