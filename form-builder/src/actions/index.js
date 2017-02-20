import { v4 } from 'node-uuid';
import { formSchema } from './schema';

const defaultObj = () => ({
  id: v4(),
});

const getSectionAction = (type, section, formId) =>({
  type,
  payload: {
    section,
    formId,
  },
});

const getFieldAction = (type, field, sectionId) =>({
  type,
  payload: {
    field,
    sectionId,
  },
});

const getFormAction = (type, form) => ({
  type,
  payload: {
    form,
  },
});

export const createForm = (formData) => {
  return getFormAction('ADD_FORM', {
    id: v4(),
    ...formData,
  });
};

export const addForm = (formData) => {
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

  return getFormAction('ADD_FORM', mappedformData);
};

export const addSection = (formId, section = defaultObj()) => {
  console.log('ACTION: EDITSECTION', section, formId)
  return getSectionAction('EDIT_SECTION', section, formId);
};

export const createSection = (formId, section = defaultObj()) => {
  console.log('addSEction', section, formId)
  return getSectionAction('ADD_SECTION', section, formId);
};

export const removeSection = (formId, section) => {
  console.log('removeSection', section, formId)
  return getSectionAction('REMOVE_SECTION', section, formId);
};

export const addField = ( sectionId, field = defaultObj() ) => {
  return getFieldAction('EDIT_FIELD', field, sectionId);
};

export const createField = ( sectionId, field = defaultObj() ) => {
  console.log('CTREATE FIELD ACTION', field, sectionId)
  return getFieldAction('ADD_FIELD', field, sectionId);
};
