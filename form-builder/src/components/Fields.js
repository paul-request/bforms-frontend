import { connect } from 'react-redux';
import React from 'react';
import { getFieldBySectionId } from '../reducers';
import Field from './Field';
import { createField } from '../actions';

const Fields = ({ sectionId, fields, onAddFieldClick }) => (
  <div>
    {fields.map(field =>
      <Field key={field.id}
             {...field} />
    )}

    <button className="button"
            onClick={() => onAddFieldClick(sectionId)}>
      Add field
    </button>
  </div>
);

const mapStateToProps = (state, { sectionId }) => {
  console.log('FIELDS MSTP', getFieldBySectionId(state, sectionId))
  return {
    fields: getFieldBySectionId(state, sectionId),
    sectionId,
  };
};

const SectionFields = connect(
  mapStateToProps,
  { onAddFieldClick: createField },
)(Fields);

export default SectionFields;
