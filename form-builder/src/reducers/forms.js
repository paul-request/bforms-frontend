import { combineReducers } from 'redux';
import form from './form';

const byId = (state = {}, action) => {
  const { payload } = action;

  switch (action.type) {
    case 'ADD_FORM':
      console.log('PAUL TEST', state, action)
      return {
        ...state,
        [payload.form.id]: form(state[action.id], action),
      };
    case 'ADD_SECTION':
      console.log('ADD SECTION payload', state, payload)
      const { sectionId, formId } = payload;
      const sectionForm = state[formId];

      return {
        ...state,
        [formId] : {
          ...sectionForm,
          sections : sectionForm.sections.concat(sectionId),
        }
      };
    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  const { payload } = action;

  switch (action.type) {
    case 'ADD_FORM':
      return [...state, payload.form.id];
    default:
      return state;
  }
};

const forms = combineReducers({
  byId,
  allIds,
});

export default forms;

export const getForms = (state) => {
  return state.allIds.map(id => state.byId[id]);
};

export const getFormById = (state, id) => {
  return state.byId[id];
};
