import { v4 } from 'node-uuid';
import {
  ADD_FORM,
  IMPORT_FORM,
  LOAD_FORM,
  UPDATE_FORM,
  ADD_SECTION,
  IMPORT_SECTION,
  REMOVE_SECTION,
  UPDATE_SECTION,
  ADD_FIELD,
  IMPORT_FIELD,
  REMOVE_FIELD,
  UPDATE_FIELD,
} from '../constants/actionTypes';

const getDefaultObj = () => ({
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
  return getFormAction(ADD_FORM, {
    formTypeId: v4(),
    ...formData,
  });
};

export const importForm = (formData) => {
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

  console.log('MAPPE FORM DATA !!!!!!!!!!!!', mappedformData)

  return getFormAction(IMPORT_FORM, mappedformData);
};

export const loadForm = (formTypeId) => {
  return getFormAction(LOAD_FORM, {
    formTypeId
  });
}

export const updateForm = (form, newProps) => {
  return getFormAction(UPDATE_FORM, {
    ...form,
    ...newProps,
  });
};

export const importSection = (formId, section = getDefaultObj()) => {
  console.log('ACTION: EDITSECTION', section, formId)
  return getSectionAction(IMPORT_SECTION, section, formId);
};

export const createSection = (formId, section = getDefaultObj()) => {
  console.log('addSEction', section, formId)
  return getSectionAction(ADD_SECTION, section, formId);
};

export const removeSection = (formId, section) => {
  console.log('removeSection', section, formId)
  return getSectionAction(REMOVE_SECTION, section, formId);
};

export const updateSection = (formId, section, newProps = {}) => {
  console.log('updateSection', section, formId, newProps)
  const updatedSection = Object.assign({}, section, newProps);

  return getSectionAction(UPDATE_SECTION, updatedSection, formId);
};

export const importField = (sectionId, field = getDefaultObj()) => {
  return getFieldAction(IMPORT_FIELD, field, sectionId);
};

export const createField = (sectionId, field = getDefaultObj()) => {
  console.log('CTREATE FIELD ACTION', field, sectionId)
  return getFieldAction(ADD_FIELD, field, sectionId);
};

export const removeField = (sectionId, field) => {
  console.log('removeField', field, sectionId)
  return getFieldAction(REMOVE_FIELD, field, sectionId);
};

export const updateField = (sectionId, field, newProps) => {
  console.log('updateField ACTION', sectionId, field, newProps)
  const updatedField = Object.assign({}, field, newProps);

  return getFieldAction(UPDATE_FIELD, updatedField, sectionId);
};
