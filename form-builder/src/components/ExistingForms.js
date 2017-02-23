import { connect } from 'react-redux';
import React from 'react';
import FormLink from './FormLink';
import { getForms } from '../reducers';

const ExistingForms = ({ forms }) => {
  if (forms.length) {
    return (
      <div className="section">
        <h2 className="heading-small">Existing forms</h2>

        <ul className="slat-container">
        {forms.map(form =>
          <li className="slat" key={form.formTypeId}>
            <FormLink formId={form.formTypeId} />
          </li>
        )}
        </ul>
      </div>
    );
  }

  return null;
}

const mapStateToProps = (state) => {
  return {
    forms: getForms(state),
  };
};

const ExistingFormsContainer = connect(
  mapStateToProps,
)(ExistingForms);

export default ExistingFormsContainer;
