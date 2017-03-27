import { connect } from 'react-redux';
import React from 'react';
import { withRouter } from 'react-router';
import { getSectionsByFormId, getCurrentFormId } from '../../reducers';
import Section from './Section';

const Sections = ({ sections }) => (
  <div>
    {sections.map((section, index) => (
      <div key={section.id}>
        <Section id={section.id} />

        <div className="form-builder__page-break">
          <span className="form-builder__page-break-number">
            Page { index + 1 }
          </span>
        </div>
      </div>
    ))}
  </div>
);

const mapStateToProps = (state) => {
  const formId = getCurrentFormId(state);

  return {
    sections: getSectionsByFormId(state, formId),
    formId,
  };
};

const SectionsContainer = withRouter(connect(
  mapStateToProps,
)(Sections));

export default SectionsContainer;
