import { connect } from 'react-redux';
import React from 'react';
import { getFormById } from '../reducers';
import { Link } from 'react-router';

const FormLink = ({ form }) => {
  return (
    <div className="grid-row">
      <div className="column-two-thirds">
        <h3 className="slat__title">{form.formName}</h3>
        <p className="slat__desc">{form.description}</p>
      </div>

      <div className="column-one-third">
        <div className="slat__actions">
          <Link className="button" to={`/form-builder/${form.formTypeId}`}>Edit</Link>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state, { formId }) => {
  return {
    form: getFormById(state, formId),
  };
};

const FormLinkContainer = connect(
  mapStateToProps,
)(FormLink);

export default FormLinkContainer;
