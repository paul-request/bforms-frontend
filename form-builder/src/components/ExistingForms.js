import { connect } from 'react-redux';
import React, { PropTypes } from 'react';
import FormLink from './FormLink';
import { getForms } from '../reducers';

const ExistingForms = ({ forms }) => {
  if (forms.length) {
    return (
      <div>
        <div className="alert alert-info" role="alert">
          <strong>We found <span className="label label-pill label-primary">{forms.length}</span> unsaved forms</strong> which you can continue editing below
        </div>

        <div className="panel panel-default">
          <ul className="list-group">
          {forms.map(form =>
            <li className="list-group-item" key={form.formTypeId}>
              <FormLink formId={form.formTypeId} />
            </li>
          )}
          </ul>
        </div>
      </div>
    );
  }

  return null;
}

ExistingForms.propTypes = {
  forms: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    forms: getForms(state),
  };
};

const ExistingFormsContainer = connect(
  mapStateToProps,
)(ExistingForms);

export default ExistingFormsContainer;
