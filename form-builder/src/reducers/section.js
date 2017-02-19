const initialState = {
  title: 'Section title',
  description: null,
  fields: [],
};

const section = (state = initialState, action) => {
  const { payload } = action;

  switch (action.type) {
    case 'EDIT_SECTION':
    console.log('SECTION: EDIT SECTION', payload)
      const section = { ...state, ...payload.section };
      const fields = section.fields.map(field => field.id);

      return {
        ...section,
        fields,
      };
    case 'ADD_SECTION':
      return {
        ...state,
        id: payload.section.id,
      };
    default:
      return state;
  }
};

export default section;
