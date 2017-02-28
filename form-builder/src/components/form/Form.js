import { connect } from 'react-redux';
import React, { Component } from 'react';
import EditableText from '../utils/EditableText';
import Sections from './Sections';
import { getFormById, getCurrentFormId } from '../../reducers';
import { createSection, updateForm } from '../../actions';

class Form extends Component {
  onSaveChanges = (newProps) => {
    const { form, onSaveChanges } = this.props;

    onSaveChanges(form, newProps);
  }

  render() {
    const { form, onAddSectionClick, onShowJSONClick } = this.props;

    return (
      <main id="content" role="main">
        <div className="grid-row">
          <div className="column-full">
            <p>
              <EditableText value={form.description}
                            propertyKey={'description'}
                            onSave={this.onSaveChanges} />
            </p>

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
  {
    onAddSectionClick: createSection,
    onSaveChanges: updateForm,
  },
)(Form);
