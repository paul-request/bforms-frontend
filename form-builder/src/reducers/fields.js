import { combineReducers } from 'redux';
import field from './field';
import { getSectionsByFormId } from './index';
import {
  removeKeysFromObject,
  removeKeyFromObject,
  removeItemsFromArray,
  removeItemFromArray
} from '../utils';
import {
  IMPORT_FORM,
  REMOVE_FORM,
  REMOVE_SECTION,
  ADD_FIELD,
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
    case ADD_FIELD:
    case UPDATE_FIELD:
      console.log('FIELDS REDUCER: ADD/EDIT/UPDATE FIELD', state, action)
      return {
        ...state,
        [payload.field.id]: field(state[payload.field.id], action),
      };
    case IMPORT_FORM:
      console.log('IMPORT FORM: FIELDS', state, payload);
      const { fields } = payload;

      return {
        ...state,
        ...fields,
      };
    case REMOVE_FORM:
      console.log('FIELDS REDUCER: BYID REMOVE_FORM', state, action)
      return removeKeysFromObject(payload.fieldIds, state);
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
    case ADD_FIELD:
      return [...state, payload.field.id];
    case IMPORT_FORM:
      return [ ...Object.keys(payload.fields) ];
    case REMOVE_FORM:
      console.log('FIELDS REDUCER: ALLIDS REMOVE_FORM', state, action)
      return removeItemsFromArray(payload.fieldIds, state);
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
