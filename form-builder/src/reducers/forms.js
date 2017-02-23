import { combineReducers } from 'redux';
import form from './form';
import { removeItemFromArray } from '../utils';
import {
  ADD_FORM,
  IMPORT_FORM,
  ADD_SECTION,
  REMOVE_SECTION,
} from '../constants/actionTypes';

const byId = (state = {}, action) => {
  const { payload } = action;

  switch (action.type) {
    case ADD_FORM:
    case IMPORT_FORM:
      console.log('PAUL TEST', state, action)
      return {
        ...state,
        [payload.form.formTypeId]: form(state[action.id], action),
      };
    case ADD_SECTION:
      console.log('ADD SECTION payload', state, payload)
      const sectionForm = state[payload.formId];

      return {
        ...state,
        [payload.formId] : {
          ...sectionForm,
          sections: sectionForm.sections.concat(payload.section.id),
        }
      };
    case REMOVE_SECTION:
      const parentForm = state[payload.formId];

      return {
        ...state,
        [payload.formId] : {
          ...parentForm,
          sections: removeItemFromArray(payload.section.id, state[payload.formId].sections),
        }
      };
    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  const { payload } = action;

  switch (action.type) {
    case ADD_FORM:
    case IMPORT_FORM:
      return [...state, payload.form.formTypeId];
    default:
      return state;
  }
};

const current = (state = {}, action) => {
  const { payload } = action;

  switch (action.type) {
    case ADD_FORM:
    case IMPORT_FORM:
      return payload.form.formTypeId;
    default:
      return state;
  }
};

const forms = combineReducers({
  byId,
  allIds,
  current,
});

export default forms;

// Selectors

export const getForms = (state) => state.allIds.map(id => state.byId[id]);

export const getFormById = (state, id) => state.byId[id];

export const getCurrentFormId = (state) => state.current;
