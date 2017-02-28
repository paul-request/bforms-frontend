import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import EditableText from '../utils/EditableText';
import FormComponent from './FormComponent';
import { getFieldById } from '../../reducers';
import { removeField, updateField } from '../../actions';

class Field extends FormComponent {
  onSaveChanges = (newProps) => {
    console.log('FIELD: onSaveChanges', newProps, this.props);
    const { sectionId, field, onSaveChanges } = this.props;

    onSaveChanges(sectionId, field, newProps);
  }

  render() {
    const { sectionId, field, onRemoveFieldClick } = this.props;

    return (
      <div onMouseOver={this.mouseOver}
           onMouseOut={this.mouseOut}
           className={`form-builder__component${this.state.isHovering ? ' form-builder__component--hover' : ''}`}>
        <div className="form-builder__component__highlight">
          <div className="form-builder__component__actions">
            <button className="button button--danger button--icon"
                    onClick={() => onRemoveFieldClick(sectionId, field)}>
              <svg className="icon icon--delete">
                <use xlinkHref="#icon-delete"></use>
              </svg>

              <span className="button--icon__text">Remove field</span>
            </button>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor={field.id} className="form-label">
            <EditableText value={field.label}
                          propertyKey={'label'}
                          onSave={this.onSaveChanges} />
          </label>

          <input type="text" id="{field.id}" name="{field.id}" className="form-control" />
        </div>
      </div>
    );
  }
};

Field.propTypes = {
  sectionId: PropTypes.string.isRequired,
  field: PropTypes.object.isRequired,
  onRemoveFieldClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state, { sectionId, id }) => {
  console.log('FIELD MSTP', sectionId, id)
  return {
    sectionId,
    field: getFieldById(state, id),
  };
};

const FieldContainer = connect(
  mapStateToProps,
  {
    onRemoveFieldClick: removeField,
    onSaveChanges: updateField,
  }
)(Field);

export default FieldContainer;
