import { connect } from 'react-redux';
import React from 'react';
import { getSections } from '../reducers';
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

const mapStateToProps = (state, ownProps) => {
  console.log('SECTIONS MSTP', ownProps)
  return {
    sections: getSections(state),
    formId: ownProps.formId,
  };
};

const FormSections = connect(
  mapStateToProps,
  { onAddSectionClick: addSection }
)(Sections);

export default FormSections;
