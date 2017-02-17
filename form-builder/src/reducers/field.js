const initialState = {
  type: 'text',
  label: 'Input label',
  readonly: false,
  mandatory: false,
};

const field = (state = initialState, action) => {
  switch (action.type) {
    case 'EDIT_FIELD':
      const id = action.payload.field.id;

      return {
        ...state,
        id,
      };
    case 'ADD_FIELD':
      const { payload } = action;
      const { fieldId } = payload;

      return {
        ...state,
        id: fieldId,
      };
    default:
      return state;
  }
};

export default field;
