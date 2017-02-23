import {
  ADD_SECTION,
  IMPORT_SECTION,
  UPDATE_SECTION,
} from '../constants/actionTypes';

const initialState = {
  title: 'Section title',
  description: null,
  fields: [],
};

const section = (state = initialState, action) => {
  const { payload } = action;

  switch (action.type) {
    case IMPORT_SECTION:
      const editSection = { ...state, ...payload.section };
      const editFields = editSection.fields.map(field => field.id);
      console.log('SECTION: EDIT SECTION', editSection, editFields)

      return {
        ...editSection,
        fields: editFields,
      };
    case UPDATE_SECTION:
      const updateSection = { ...state, ...payload.section };
      const updateFields = updateSection.fields.map(id => id);
      console.log('SECTION: EDIT SECTION', updateSection, updateFields)

      return {
        ...updateSection,
        fields: updateFields,
      };
    case ADD_SECTION:
      return {
        ...state,
        id: payload.section.id,
      };
    default:
      return state;
  }
};

export default section;
