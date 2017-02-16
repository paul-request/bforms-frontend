import { combineReducers } from 'redux';
import section from './section';

const byId = (state = {}, action) => {
  const { payload } = action;

  switch (action.type) {
    case 'ADD_SECTION':
      return {
        ...state,
        [payload.sectionId]: section(state[payload.sectionId], action),
      };
    case 'ADD_FIELD':
      const { fieldId } = payload;
      const fieldSection = state[payload.sectionId];

      return {
        ...state,
        [payload.sectionId] : {
          ...fieldSection,
          fields : fieldSection.fields.concat(fieldId),
        }
      };
    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  const { payload } = action;

  switch (action.type) {
    case 'ADD_SECTION':
      return [...state, payload.sectionId];
    default:
      return state;
  }
};

const sections = combineReducers({
  byId,
  allIds,
});

export default sections;

export const getSections = (state) =>
  state.allIds.map(id => state.byId[id]);

export const getSectionById = (state, sectionId) => state.byId[sectionId];
