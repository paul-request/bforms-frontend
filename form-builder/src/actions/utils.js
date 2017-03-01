import { v4 } from 'node-uuid';

export const getDefaultObj = () => ({
  id: v4(),
});

export const mapObjWithId = (obj, id = v4()) => ({ ...obj, id });
