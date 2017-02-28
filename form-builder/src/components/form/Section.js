import { connect } from 'react-redux';
import React, { Component } from 'react';
import Fields from './Fields';
import EditableText from '../utils/EditableText';
import FormComponent from './FormComponent';
import { removeSection, createField, updateSection } from '../../actions';
import { getSectionById, getCurrentFormId } from '../../reducers';

class Section extends FormComponent {
  onSaveChanges = (newProps) => {
    console.log('SECTION: onSaveChanges', newProps, this.props);
    const { formId, section, onSaveChanges } = this.props;

    onSaveChanges(formId, section, newProps);
  }

  render() {
    const {
      formId,
      section,
      onRemoveSectionClick,
      onAddFieldClick
    } = this.props;

    return (
      <div onMouseOver={this.mouseOver}
           onMouseOut={this.mouseOut}
           className={`form-builder__component${this.state.isHovering ? ' form-builder__component--hover' : ''}`}>
       <div className="form-builder__component__highlight">
         <div className="form-builder__component__actions">
           <button className="button button--danger button--icon"
                   onClick={() => onRemoveSectionClick(formId, section)}>
             <svg className="icon icon--delete">
               <use xlinkHref="#icon-delete"></use>
             </svg>

             <span className="button--icon__text">Remove section</span>
           </button>

           <button className="button button--icon"
                   onClick={() => onAddFieldClick(section.id)}>
             <svg className="icon icon--plus">
               <use xlinkHref="#icon-plus"></use>
             </svg>

             <span className="button--icon__text">Add field</span>
           </button>
         </div>
       </div>

        <div className="section">
          <h2 className="heading-medium">
            <EditableText value={section.title} propertyKey={'title'} onSave={this.onSaveChanges} />
          </h2>

          {section.description &&
            <p>
              <EditableText value={section.description} propertyKey={'description'} onSave={this.onSaveChanges} />
            </p>
          }

          <Fields sectionId={section.id}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, { id }) => {
  const formId = getCurrentFormId(state);

  console.log('SECTION MSTP', id, formId)

  return {
    section: getSectionById(state, id),
    formId,
  };
};

const SectionContainer = connect(
  mapStateToProps,
  {
    onRemoveSectionClick: removeSection,
    onAddFieldClick: createField,
    onSaveChanges: updateSection,
  },
)(Section);

export default SectionContainer;
