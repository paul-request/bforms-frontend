import {
  ADD_FORM,
  IMPORT_FORM,
  UPDATE_FORM,
} from '../constants/actionTypes';

const initialState = {
  formName: 'Form title',
  description: 'A description of your form',
  version: '0.1.0',
  characterSet: 'UTF-8',
  sections: [],
};

// TODO: Do I need this, what is it doind that forms.js isn't????
const form = (state = initialState, action) => {
  const { payload } = action;
  const { formTypeId, formName, description } = payload.form;

  switch (action.type) {
    case ADD_FORM:
      return {
        ...state,
        formTypeId,
        formName,
        description,
      };
    case IMPORT_FORM:
    case UPDATE_FORM:
      const { sections = [] } = payload.form;
      const sectionIds = sections.map(section => section.id);

      return {
        ...state,
        formTypeId,
        formName,
        description,
        sections: sectionIds,
      };
    default:
      return state;
  }
};

export default form;
