const initialState = {
  title: 'Section title',
  description: null,
  fields: [],
};

const section = (state = initialState, action) => {
  const { payload } = action;

  switch (action.type) {
    case 'ADD_SECTION':
      return {
        ...state,
        id: payload.sectionId,
      };
    default:
      return state;
  }
};

export default section;
