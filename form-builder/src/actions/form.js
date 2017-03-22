import { v4 } from 'node-uuid';
import {
  ADD_FORM,
  IMPORT_FORM,
  LOAD_FORM,
  UPDATE_FORM,
  REMOVE_FORM,
} from '../constants/actionTypes';
import { mapObjWithId } from './utils';

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

export const updateForm = (form, newProps = {}) => {
  return getFormAction(UPDATE_FORM, {
    ...form,
    ...newProps,
  });
};

export const removeForm = (formId, sections) => {
  const sectionIds = sections.map(section => section.id);
  const fieldIds = [].concat(sections.reduce((output, section) =>
    output.concat(section.fields.map(id => id)), []));

  console.log('REMOVE FORM ACTION:', formId, sectionIds, fieldIds)

  return {
    type: REMOVE_FORM,
    payload: {
      formId,
      sectionIds,
      fieldIds,
    },
  };
}
