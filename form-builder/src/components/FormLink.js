import { connect } from 'react-redux';
import React from 'react';
import { getFormById } from '../reducers';
import { Link } from 'react-router';

const FormLink = ({ form }) => {
  return (
    <li>
      <h3 className="heading-small">{form.formName}</h3>
      <p>{form.description}</p>

      <div className="actions">
        <Link to={`/form-builder/${form.id}`}>Edit</Link>
      </div>
    </li>
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
