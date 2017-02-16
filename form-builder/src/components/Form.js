import { connect } from 'react-redux';
import React, { Component } from 'react';
import Sections from './Sections';
import { withRouter } from 'react-router';

const Form = ({ form }) => (
  <div>
    <h1 className="heading-large">{form.formName}</h1>
    <p>{form.description}</p>

    <Sections formId={form.id}/>
  </div>
);

const mapStateToProps = (state, { params }) => {
  // TODO: replace with a getForm()
  return {
    form: state.forms.byId[params.formId],
  };
};

export default withRouter(connect(mapStateToProps)(Form));
