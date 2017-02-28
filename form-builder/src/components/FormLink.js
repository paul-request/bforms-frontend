import { connect } from 'react-redux';
import React from 'react';
import { getFormById } from '../reducers';
import { Link } from 'react-router';

const FormLink = ({ form }) => {
  return (
    <div className="row">
      <div className="col-xs-8">
        <h3 className="list-group-item-heading">{form.formName}</h3>
        <p className="list-group-item-text">{form.description}</p>
      </div>

      <div className="col-xs-4">
        <div className="slat__actions text-right">
          <Link className="btn btn-primary" to={`/form-builder/${form.formTypeId}`}>Edit</Link>
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
