import { combineReducers } from 'redux';
import section from './section';
import { removeKeyFromObject, removeItemFromArray } from '../utils';
import {
  ADD_SECTION,
  IMPORT_SECTION,
  REMOVE_SECTION,
  UPDATE_SECTION,
  ADD_FIELD,
  REMOVE_FIELD
} from '../constants/actionTypes';

const byId = (state = {}, action) => {
  const { payload } = action;

  console.log('SECTIONS: STATE:', state, action)

  switch (action.type) {
    case REMOVE_SECTION:
      return removeKeyFromObject(payload.section.id, state);
    case IMPORT_SECTION:
    case ADD_SECTION:
    case UPDATE_SECTION:
      return {
        ...state,
        [payload.section.id]: section(state[payload.section.id], action),
      };
    case ADD_FIELD:
      const { field } = payload;
      const fieldSection = state[payload.sectionId];

      return {
        ...state,
        [payload.sectionId] : {
          ...fieldSection,
          fields: fieldSection.fields.concat(field.id),
        }
      };
    case REMOVE_FIELD:
      const parentSection = state[payload.sectionId];

      return {
        ...state,
        [payload.sectionId] : {
          ...parentSection,
          fields: removeItemFromArray(payload.field.id, state[payload.sectionId].fields),
        }
      };
    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  const { payload } = action;

  switch (action.type) {
    case REMOVE_SECTION:
      return removeItemFromArray(payload.section.id, state);
    case IMPORT_SECTION:
    case ADD_SECTION:
      return [...state, payload.section.id];
    default:
      return state;
  }
};

const sections = combineReducers({
  byId,
  allIds,
});

export default sections;

export const getSections = (state, sections) => {
  console.log('GET SECTIONS', sections)
  return sections.map(id => state.byId[id]);
}

export const getSectionById = (state, id) => state.byId[id];