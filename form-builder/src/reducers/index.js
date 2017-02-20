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

export const getSectionsByFormId = (state, id) => {
  console.log('get sections by form id', state, id)
  const form = fromForms.getFormById(state.forms, id);

  return fromSections.getSections(state.sections, form.sections);
};

export const getFieldsBySectionId = (state, id) => {
  const section = fromSections.getSectionById(state.sections, id);

  console.log('getFieldsBySectionId', section)

  return fromFields.getFields(state.fields, section.fields);
};

export const getSectionById = (state, id) => fromSections.getSectionById(state.sections, id);

export const getFormById = (state, id) => fromForms.getFormById(state.forms, id);

export const getForms = (state) => fromForms.getForms(state.forms);

export const getCurrentFormId = (state) => fromForms.getCurrentFormId(state.forms);
