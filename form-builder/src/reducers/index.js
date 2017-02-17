import sections, * as fromSections from './sections';
import fields, * as fromFields from './fields';
import forms, * as fromForms from'./forms';
import { combineReducers } from 'redux';

const formBuilder = combineReducers({
  forms,
  sections,
  fields,
});

export default formBuilder;

export const getSectionsByFormId = (state, formId) => {
  console.log('get sections by form id', state, formId)
  const form = fromForms.getFormById(state.forms, formId);

  return fromSections.getSections(state.sections, form.sections);
};

export const getFieldBySectionId = (state, sectionId) => {
  const section = fromSections.getSectionById(state.sections, sectionId);

  return fromFields.getFields(state.fields, section.fields);
};

export const getFormById = (state, formId) => {
  console.log('GET FORM BY ID', formId)
  return fromForms.getFormById(state.forms, formId);
};

export const getForms = (state) => {
  return fromForms.getForms(state.forms);
};
