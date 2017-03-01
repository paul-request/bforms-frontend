import { v4 } from 'node-uuid';
import {
  ADD_SECTION,
  IMPORT_SECTION,
  REMOVE_SECTION,
  UPDATE_SECTION,
} from '../constants/actionTypes';
import { getDefaultObj } from './utils';

const getSectionAction = (type, section, formId) =>({
  type,
  payload: {
    section,
    formId,
  },
});

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
