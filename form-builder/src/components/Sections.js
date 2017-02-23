import { connect } from 'react-redux';
import React from 'react';
import { getSectionsByFormId, getCurrentFormId } from '../reducers';
import Section from './Section';

const Sections = ({ sections }) => (
  <div>
    {sections.map(section =>
      <Section key={section.id}
               id={section.id} />
    )}
  </div>
);

const mapStateToProps = (state) => {
  const formId = getCurrentFormId(state);
  console.log('SECTIONS MSTP', formId)
  return {
    sections: getSectionsByFormId(state, formId),
    formId,
  };
};

const SectionsContainer = connect(
  mapStateToProps,
)(Sections);

export default SectionsContainer;
