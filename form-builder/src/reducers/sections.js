import { combineReducers } from 'redux';
import section from './section';
import { removeKeyFromObject, removeItemFromArray } from '../utils';

const byId = (state = {}, action) => {
  const { payload } = action;

  switch (action.type) {
    case 'REMOVE_SECTION':
      return removeKeyFromObject(payload.section.id, state);
    case 'EDIT_SECTION':
    case 'ADD_SECTION':
      return {
        ...state,
        [payload.section.id]: section(state[payload.section.id], action),
      };
    case 'ADD_FIELD':
      const { field } = payload;
      const fieldSection = state[payload.sectionId];

      return {
        ...state,
        [payload.sectionId] : {
          ...fieldSection,
          fields : fieldSection.fields.concat(field.id),
        }
      };
    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  const { payload } = action;

  switch (action.type) {
    case 'REMOVE_SECTION':
      return removeItemFromArray(payload.section.id, state);
    case 'EDIT_SECTION':
    case 'ADD_SECTION':
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

export const getSectionById = (state, sectionId) => state.byId[sectionId];
