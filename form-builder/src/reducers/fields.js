import { combineReducers } from 'redux';
import field from './field';

const byId = (state = {}, action) => {
  const { payload } = action;

  switch (action.type) {
    case 'ADD_FIELD':
      return {
        ...state,
        [payload.fieldId]: field(state[payload.fieldId], action),
      };
    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  const { payload } = action;

  switch (action.type) {
    case 'ADD_FIELD':
      return [...state, payload.fieldId];
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
