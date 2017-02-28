import { connect } from 'react-redux';
import React, { Component } from 'react';
import Sections from './Sections';
import { getFormById, getCurrentFormId } from '../reducers';
import { createSection } from '../actions';

class Form extends Component {
  render() {
    const { form, onAddSectionClick, onShowJSONClick } = this.props;

    return (
      <main id="content" role="main">
        <div className="grid-row">
          <div className="column-full">
            <p>{form.description}</p>

            <Sections />

            <button className="button"
                    onClick={() => onAddSectionClick(form.formTypeId)}>
              Add section
            </button>
          </div>
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  const formId = getCurrentFormId(state);

  return {
    form: getFormById(state, formId),
  };
};

export default connect(
  mapStateToProps,
  { onAddSectionClick: createSection },
)(Form);
