import sections, * as fromSections from './sections';
import fields, * as fromFields from './fields';
import forms, * as fromForms from './forms';
import { combineReducers } from 'redux';

const formBuilder = combineReducers({
  forms,
  sections,
  fields,
});

export default formBuilder;

export const getSectionById = (state, id) => fromSections.getSectionById(state.sections, id);

export const getFieldById = (state, id) => fromFields.getFieldById(state.fields, id);

export const getFormById = (state, id) => fromForms.getFormById(state.forms, id);

export const getForms = (state) => fromForms.getForms(state.forms);

export const getCurrentFormId = (state) => fromForms.getCurrentFormId(state.forms);

export const getSectionsByFormId = (state, id) => {
  const form = getFormById(state, id);

  return fromSections.getSections(state.sections, form.sections);
};

export const getFieldsBySectionId = (state, id) => {
  const section = getSectionById(state, id);

  console.log('getFieldsBySectionId', section, section.fields)

  return fromFields.getFields(state.fields, section.fields);
};

export const getDenormalisedForm = (state, formId) => {
  // TODO: formTypeId - need to generate this probably and use instead of id?
  const form = getFormById(state, formId);
  const formSections = getSectionsByFormId(state, formId);
  const sections = formSections.map(section => {
    const { id, ...outputSection } = section;

    return {
      ...outputSection,
      fields: getFieldsBySectionId(state, section.id),
    }
  });

  return {
    ...form,
    sections,
  };
};
