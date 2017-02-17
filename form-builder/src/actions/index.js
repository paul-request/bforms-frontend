import { v4 } from 'node-uuid';
import { formSchema } from './schema';

export const createForm = (formData) => {
  const form = {
    id: v4(),
    ...formData,
  };

  return {
    type: 'ADD_FORM',
    payload: {
      form,
    },
  };
};

export const editForm = (formData) => {
  const mapObjWithId = (obj, id = v4()) => ({ ...obj, id });
  const mapFormWithIds = (form) => {
    if (form.sections) {
      const sections = form.sections.map(section => {
        const mappedSection = mapObjWithId(section, section.id);

        if (section.fields) {
          mappedSection.fields = section.fields.map(field => mapObjWithId(field, field.id));
        }

        return mappedSection;
      });

      return mapObjWithId({ ...form, sections }, form.formTypeId);
    }

    return mapObjWithId({ ...form }, form.formTypeId);
  };

  console.log('TEST FORM DATA', formData)
  const mappedformData = mapFormWithIds(formData);

  return {
    type: 'ADD_FORM',
    payload: {
      form: mappedformData,
    },
  };
}
export const editSection = ( section, formId ) => {
  console.log('ACTION: EDITSECTION', section, formId)
  return {
    type: 'EDIT_SECTION',
    payload: {
      formId,
      section,
    }
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

export const editField = ( field, sectionId ) => {
  return {
    type : "EDIT_FIELD",
    payload : {
      sectionId,
      field,
    },
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
