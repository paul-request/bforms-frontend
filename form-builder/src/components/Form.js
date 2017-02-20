import { connect } from 'react-redux';
import React, { Component } from 'react';
import Sections from './Sections';
import { withRouter } from 'react-router';
import { getFormById } from '../reducers';

const Form = ({ form }) => (
  <div>
    <h1 className="heading-large">{form.formName}</h1>
    <p>{form.description}</p>

    <Sections />
  </div>
);

const mapStateToProps = (state, { params }) => {
  return {
    form: getFormById(state, params.formId),
  };
};

export default withRouter(
  connect(mapStateToProps)(Form)
);
