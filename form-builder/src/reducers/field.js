const initialState = {
  type: 'text',
  label: 'Input label',
  readonly: false,
  mandatory: false,
};

const field = (state = initialState, action) => {
  const { payload } = action;

  switch (action.type) {
    case 'EDIT_FIELD':
    case 'ADD_FIELD':
      return {
        ...state,
        id: payload.field.id,
      };
    default:
      return state;
  }
};

export default field;
