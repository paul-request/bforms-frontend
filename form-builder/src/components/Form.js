import { connect } from 'react-redux';
import React, { Component } from 'react';
import Sections from './Sections';
import { withRouter } from 'react-router';
import { getFormById } from '../reducers';
import { createSection } from '../actions';
import '../stylesheets/form.scss';

const Form = ({ form, onAddSectionClick, onShowJSONClick }) => (
  <div>
    <h1 className="heading-large">{form.formName}</h1>
    <p>{form.description}</p>

    <Sections />

    <button className="button"
            onClick={() => onAddSectionClick(form.formTypeId)}>
      Add section
    </button>
  </div>
);

const mapStateToProps = (state, { params }) => {
  console.log('FORM MSTP', params.formId)
  return {
    form: getFormById(state, params.formId),
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { onAddSectionClick: createSection },
  )(Form)
);
