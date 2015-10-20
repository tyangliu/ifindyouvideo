'use strict';

import assign from 'object-assign';
import { combineReducers } from 'redux';

function user(state = null, action) {
  switch (action.type) {
    default:
      return state;
  }
}

const rootReducer = combineReducers({user});
export default rootReducer;
