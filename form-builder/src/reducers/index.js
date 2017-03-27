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

export const getFormById = (state, id) => {
  console.log('GETFORMBYID:', state, id)
  return fromForms.getFormById(state.forms, id);
}

export const getForms = (state) => fromForms.getForms(state.forms);

export const getCurrentFormId = (state) => fromForms.getCurrentFormId(state.forms);

export const getSectionsByFormId = (state, id) => {
  const form = getFormById(state, id);

  console.log('GET SECTIONS BY FORM ID', state, id)

  return fromSections.getSections(state.sections, form.sections);
};

export const getFieldsBySectionId = (state, id) => {
  const section = getSectionById(state, id);

  return fromFields.getFields(state.fields, section.fields);
};

export const getDenormalisedForm = (state, formId) => {
  const form = getFormById(state, formId);
  const formSections = getSectionsByFormId(state, formId);

  console.log('IN getDenormalisedForm: FORM SECTIONS', formSections)
  const sections = formSections.map(section => {
    // Keep the Id now
    // const { id, ...outputSection } = section;


    return {
      ...section,
      fields: getFieldsBySectionId(state, section.id),
    }
  });

  console.log('IN getDenormalisedForm: SECTIONS', form, sections, {
    ...form,
    sections,
  })

  return {
    ...form,
    sections,
  };
};
