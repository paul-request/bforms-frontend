import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router';
import { getFormById, getSectionsByFormId } from '../reducers';
import { removeForm } from '../actions';

const FormLink = ({ form, sections, onRemoveFormClick }) => (
  <div className="row">
    <div className="col-xs-8">
      <h3 className="list-group-item-heading">{form.formName}</h3>
      <p className="list-group-item-text">{form.description}</p>
    </div>

    <div className="col-xs-4">
      <div className="list-group-item-actions text-right">
        <Link className="btn btn-primary btn-icon" to={`/form-builder/${form.formTypeId}`}>
          <i className="glyphicon glyphicon-pencil"></i>
          <span className="sr-only">Edit</span>
        </Link>

        <button className="btn btn-danger btn-icon"
                onClick={() => onRemoveFormClick(form.formTypeId, sections)}>
          <i className="glyphicon glyphicon-remove"></i>
          <span className="sr-only">Delete</span>
        </button>
      </div>
    </div>
  </div>
);

const mapStateToProps = (state, { formId }) => {
  return {
    form: getFormById(state, formId),
    sections: getSectionsByFormId(state, formId),
  };
};

const FormLinkContainer = connect(
  mapStateToProps,
  {
    onRemoveFormClick: removeForm,
  }
)(FormLink);

export default FormLinkContainer;
