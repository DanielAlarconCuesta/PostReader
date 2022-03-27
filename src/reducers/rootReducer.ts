import { combineReducers } from 'redux';

import { userReducer } from './userReducer';
import { toolBarReducer } from './toolBarReducer';
import { userBoxListReducer } from './userBoxListReducer';
import { sessionReducer } from './sessionReducer';

const rootReducer = combineReducers({
  users: userReducer,
  toolBar: toolBarReducer,
  userBoxList: userBoxListReducer,
  session: sessionReducer
});

export default rootReducer;
