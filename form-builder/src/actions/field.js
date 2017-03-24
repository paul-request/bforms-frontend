import { v4 } from 'node-uuid';
import {
  ADD_FIELD,
  REMOVE_FIELD,
  UPDATE_FIELD,
} from '../constants/actionTypes';
import { getDefaultObj } from './utils';

const getFieldAction = (type, field, sectionId) =>({
  type,
  payload: {
    field,
    sectionId,
  },
});

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
