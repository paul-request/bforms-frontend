import sections, * as fromSections from './sections';
import fields, * as fromFields from './fields';
import forms from'./forms';
import { combineReducers } from 'redux';

const formBuilder = combineReducers({
  forms,
  sections,
  fields,
});

export default formBuilder;

export const getSections = (state) =>
  fromSections.getSections(state.sections);

export const getFieldBySectionId = (state, sectionId) => {
  const section = fromSections.getSectionById(state.sections, sectionId);

  return fromFields.getFields(state.fields, section.fields);
}
