import { combineReducers } from 'redux';
import field from './field';
import {
  removeKeysFromObject,
  removeKeyFromObject,
  removeItemsFromArray,
  removeItemFromArray
} from '../utils';
import {
  REMOVE_SECTION,
  ADD_FIELD,
  IMPORT_FIELD,
  REMOVE_FIELD,
  UPDATE_FIELD
} from '../constants/actionTypes';

const byId = (state = {}, action) => {
  const { payload } = action;

  switch (action.type) {
    case REMOVE_SECTION:
      return removeKeysFromObject(payload.section.fields, state);
    case REMOVE_FIELD:
      return removeKeyFromObject(payload.field.id, state);
    case IMPORT_FIELD:
    case ADD_FIELD:
    case UPDATE_FIELD:
      console.log('FIELDS REDUCER: ADD/EDIT/UPDATE FIELD', state, action)
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

  console.log('FIELDS COMP ALLIDS', state, action)

  switch (action.type) {
    case REMOVE_SECTION:
      return removeItemsFromArray(payload.section.fields, state);
    case REMOVE_FIELD:
      return removeItemFromArray(payload.field.id, state);
    case IMPORT_FIELD:
    case ADD_FIELD:
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

export const getFields = (state, fields) => {
  return fields.map(id => state.byId[id]);
};

export const getFieldById = (state, id) => state.byId[id];