import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getDenormalisedForm, getCurrentFormId } from '../reducers';

const Output = ({ form }) => (
  <div className="panel panel-default">
    <div className="panel-body">
      <pre>
        {JSON.stringify(form, null, 2)}
      </pre>
    </div>
  </div>
);

const mapStateToProps = (state) => {
  const formId = getCurrentFormId(state);

  return {
    form: getDenormalisedForm(state, formId),
  };
};

const OutputContainer = withRouter(connect(
  mapStateToProps,
)(Output));

export default OutputContainer;
