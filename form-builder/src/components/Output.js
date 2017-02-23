import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getDenormalisedForm } from '../reducers';

const Output = ({ form }) => (
  <pre className="form-builder__output">
    {JSON.stringify(form, null, 2)}
  </pre>
);

const mapStateToProps = (state, { params }) => {
  return {
    form: getDenormalisedForm(state, params.formId),
  };
};

const OutputContainer = withRouter(connect(
  mapStateToProps,
)(Output));

export default OutputContainer;
