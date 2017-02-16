import { v4 } from 'node-uuid';

export const addForm = ({ formName, description, formData = {} }) => {
  const form = Object.assign({}, formData, {
    id: v4(),
    formName,
    description,
  });

  console.log('ADD FORM ACTION', form)

  return {
    type: 'ADD_FORM',
    payload: {
      form,
    },
  };
}

export const addSection = ( formId ) => {
  return {
    type: 'ADD_SECTION',
    payload: {
      formId,
      sectionId: v4(),
    }
  };
}

export const addField = ( sectionId ) => {
  return {
    type : "ADD_FIELD",
    payload : {
      sectionId,
      fieldId: v4(),
    },
  };
}
