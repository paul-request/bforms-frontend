import { combineReducers } from 'redux';
import field from './field';

const byId = (state = {}, action) => {
  const { payload } = action;

  switch (action.type) {
    case 'EDIT_FIELD':
    case 'ADD_FIELD':
      return {
        ...state,
        [payload.field.id]: field(state[payload.field.id], action),
      };
    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  const { payload } = action;

  switch (action.type) {
    case 'EDIT_FIELD':
    case 'ADD_FIELD':
      return [...state, payload.field.id];
    default:
      return state;
  }
};

const fields = combineReducers({
  byId,
  allIds,
});

export default fields;

export const getFields = (state, fields) => fields.map(id => state.byId[id]);
