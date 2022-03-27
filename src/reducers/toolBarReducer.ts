import { ToolBarAction, ToolBarActionType } from "../actions/toolBarActions";

interface State {
    sortByNewest: boolean;
    nameFilter: string;
    postFilter: string;
}

const initialState = {
    sortByNewest: true,
    nameFilter: "",
    postFilter: ""
}

export const toolBarReducer = (state: State = initialState, action: ToolBarAction):State => {

    switch(action.type) {
        case ToolBarActionType.SORT_BY_NEWEST:
            return {
                ...state,
                sortByNewest: action.payload
            }

        case ToolBarActionType.FILTER_BY_NAME:
            return {
                ...state,
                nameFilter: action.payload || ""
            }

        case ToolBarActionType.FILTER_BY_POST:
            return {
                ...state,
                postFilter: action.payload || ""
            }

        default:
            return state
    }
}
