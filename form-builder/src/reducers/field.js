import {
  ADD_FIELD,
  IMPORT_FIELD,
  UPDATE_FIELD
} from '../constants/actionTypes';

const initialState = {
  type: 'text',
  label: 'Input label',
  readonly: false,
  mandatory: false,
};

const field = (state = initialState, action) => {
  const { payload } = action;
  const { field } = payload;

  console.log('FIELD REDUCER: FIELD', state, action)

  switch (action.type) {
    case IMPORT_FIELD:
    case ADD_FIELD:
    case UPDATE_FIELD:
      return {
        ...state,
        ...field,
      };
    default:
      return state;
  }
};

export default field;
