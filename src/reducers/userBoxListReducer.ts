import { UserBoxListAction, UserBoxListActionType } from "../actions/userBoxListActions";
import User from "../interfaces/User";

interface State {
    selectedUser: User | null;
}

const initialState: State = {
    selectedUser: null
}

export const userBoxListReducer = (state: State = initialState, action: UserBoxListAction): State => {

    switch(action.type) {
        case UserBoxListActionType.SELECT_USER:
            return {
                selectedUser: action.payload
            }

        default:
            return state;
    }
}
