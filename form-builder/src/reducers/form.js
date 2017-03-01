import {
  ADD_FORM,
  IMPORT_FORM,
  UPDATE_FORM,
  REMOVE_FORM,
} from '../constants/actionTypes';

const initialState = {
  formName: 'Form title',
  description: 'A description of your form',
  version: '0.1.0',
  characterSet: 'UTF-8',
  sections: [],
};

// TODO: Just get the sections from the props and ..rest, so taht we just
// copy over all props// then choose what to do with sections in the reducers
const form = (state = initialState, action) => {
  const { payload } = action;
  const { sections = [], ...rest } = payload.form;

  switch (action.type) {
    case ADD_FORM:
      return {
        ...state,
        ...rest,
      };
    case IMPORT_FORM:
      const sectionIds = sections.map(section => section.id);

      return {
        ...state,
        ...rest,
        sections: sectionIds,
      };
    case UPDATE_FORM:
      return {
        ...state,
        ...rest,
        sections,
      };
    default:
      return state;
  }
};

export default form;
