export enum ToolBarActionType {
    SORT_BY_NEWEST = "SORT_BY_NEWEST",
    SORT_BY_OLDEST = "SORT_BY_OLDEST",
    FILTER_BY_NAME = "FILTER_BY_NAME",
    FILTER_BY_POST = "FILTER_BY_POST" 
}

interface ToolBarActionSortByNewest {
    type: ToolBarActionType.SORT_BY_NEWEST,
    payload: boolean
}

interface ToolBarActionFilterName {
    type: ToolBarActionType.FILTER_BY_NAME,
    payload: string
}

interface ToolBarActionFilterPost {
    type: ToolBarActionType.FILTER_BY_POST,
    payload: string
}

export type ToolBarAction = (ToolBarActionSortByNewest | ToolBarActionFilterName | ToolBarActionFilterPost);
