import { connect } from 'react-redux';
import React from 'react';
import { getSectionsByFormId, getCurrentFormId } from '../reducers';
import Section from './Section';
import { createSection } from '../actions';

const Sections = ({ sections, formId, onAddSectionClick }) => (
  <div>
    {sections.map(section =>
      <Section key={section.id}
               id={section.id} />
    )}

    <button className="button"
            onClick={() => onAddSectionClick(formId)}>
      Add section
    </button>
  </div>
);

const mapStateToProps = (state,) => {
  const formId = getCurrentFormId(state);
  console.log('SECTIONS MSTP', formId)
  return {
    sections: getSectionsByFormId(state, formId),
    formId,
  };
};

const SectionsContainer = connect(
  mapStateToProps,
  { onAddSectionClick: createSection }
)(Sections);

export default SectionsContainer;
