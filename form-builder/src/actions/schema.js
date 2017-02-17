import { schema } from 'normalizr';

const fieldSchema = new schema.Entity('fields');

const sectionSchema = new schema.Entity('sections', {
  fields: [ fieldSchema ],
});

export const formSchema = new schema.Entity('forms', {
  sections: [ sectionSchema ],
});
