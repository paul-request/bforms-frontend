import { connect } from 'react-redux';
import React from 'react';
import { getFieldBySectionId } from '../reducers';
import Field from './Field';
import { addField } from '../actions';

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

const mapStateToProps = (state, ownProps) => {
  console.log('FIELDS MSTP', getFieldBySectionId(state, ownProps.sectionId))
  return {
    fields: getFieldBySectionId(state, ownProps.sectionId),
    sectionId: ownProps.sectionId,
  };
};

const SectionFields = connect(
  mapStateToProps,
  { onAddFieldClick: addField },
)(Fields);

export default SectionFields;
