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

  switch (action.type) {
    case 'ADD_FORM':
      const { id, formName, description, sections = [] } = payload.form;
      const sectionIds = sections.map(section => section.id);

      return {
        ...state,
        id,
        formName,
        description,
        sections: sectionIds,
      };
    default:
      return state;
  }
};

export default form;
