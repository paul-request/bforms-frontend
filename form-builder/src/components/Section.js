import { connect } from 'react-redux';
import React, { Component } from 'react';
import Fields from './Fields';
import { removeSection } from '../actions';
import { getSectionById, getCurrentFormId } from '../reducers';

const Section = ({ formId, section, onRemoveSectionClick }) => (
  <div className="form-builder-component">
    <div className="section">
      <h2 className="heading-medium">{section.title}</h2>

      {section.description &&
        <p>{section.description}</p>
      }

      <Fields sectionId={section.id}/>
    </div>

    <div className="action-overlay action-overlay-section">
      <button className="button"
              onClick={() => onRemoveSectionClick(formId, section)}>
        Remove section
      </button>
    </div>
  </div>
);

const mapStateToProps = (state, { id }) => {
  console.log('SECTION MSTP', id)
  const formId = getCurrentFormId(state);

  return {
    section: getSectionById(state, id),
    formId,
  };
};

const SectionContainer = connect(
  mapStateToProps,
  { onRemoveSectionClick: removeSection }
)(Section);

export default SectionContainer;
