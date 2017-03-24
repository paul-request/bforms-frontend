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

  const fields = {};
  const sections = {};

  const { sections: formSections, ...importedForm } = mappedformData;

  const form = {
    ...importedForm,
    sections: formSections.map(section => section.id),
  };

  formSections.forEach(({ fields: sectionFields, ...section })  => {
    const fieldIds = sectionFields.map(field => field.id);

    sections[section.id] = {
      ...section,
      fields: fieldIds,
    };

    sectionFields.forEach(field => {
      fields[field.id] = {
        ...field,
      };
    });
  });

  console.log('IMPORT FORM< OBJ', form, sections, fields)

  return {
    type: IMPORT_FORM,
    payload: {
      form,
      sections,
      fields,
    },
  };
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
