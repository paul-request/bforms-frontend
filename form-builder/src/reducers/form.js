const initialState = {
  formName: 'Form title',
  description: 'A description of your form',
  version: '0.1.0',
  characterSet: 'UTF-8',
  sections: [],
};

const form = (state = initialState, action) => {
  const { payload } = action;

  switch (action.type) {
    case 'ADD_FORM':
      const { id, formName, description } = payload.form;

      return {
        ...state,
        id,
        formName,
        description,
      };
    default:
      return state;
  }
};

export default form;
