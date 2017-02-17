import { connect } from 'react-redux';
import React from 'react';
import { getSectionsByFormId } from '../reducers';
import Section from './Section';
import { addSection } from '../actions';

const Sections = ({ formId, sections, onAddSectionClick }) => (
  <div>
    {sections.map(section =>
      <Section key={section.id}
               {...section} />
    )}

    <button className="button"
            onClick={() => onAddSectionClick(formId)}>
      Add section
    </button>
  </div>
);

const mapStateToProps = (state, { formId }) => {
  console.log('SECTIONS MSTP', formId)
  return {
    sections: getSectionsByFormId(state, formId),
    formId,
  };
};

const FormSections = connect(
  mapStateToProps,
  { onAddSectionClick: addSection }
)(Sections);

export default FormSections;
