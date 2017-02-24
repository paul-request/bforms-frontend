import { connect } from 'react-redux';
import React, { PropTypes } from 'react';
import { getFieldsBySectionId } from '../reducers';
import Field from './Field';

const Fields = ({ sectionId, fields }) => (
  <div>
    {fields.map(field =>
      <Field key={field.id}
             id={field.id}
             sectionId={sectionId} />
    )}
  </div>
);

const mapStateToProps = (state, { sectionId }) => {
  console.log('FIELDS MSTP: fields', getFieldsBySectionId(state, sectionId))
  return {
    fields: getFieldsBySectionId(state, sectionId),
    sectionId,
  };
};

const FieldsContainer = connect(
  mapStateToProps,
)(Fields);

export default FieldsContainer;
