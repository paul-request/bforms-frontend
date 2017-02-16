import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { addForm } from '../actions';
import { browserHistory } from 'react-router';

const AddForm = (data) => {
  let title, description, formData;

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();

          const hasDetails = title.value.trim() || description.value.trim();
          const hasData = formData.value;

          if (!hasDetails && !hasData) return;

          const addFormAction = addForm({
            formName: title.value,
            description: description.value,
            formData: formData.value,
          });

          console.log('ADD FORM', addFormAction)

          data.dispatch(addFormAction);

          browserHistory.push(`/form-builder/${addFormAction.payload.form.id}`);
        }}>
        <h2 className="heading-small">Create a form from scratch</h2>

        <div className="form-group">
          <label htmlFor="form-title" className="formControl">Title</label>
          <input id="form-title" className="form-control" ref={node => { title = node; }} />
        </div>

        <div className="form-group">
          <label htmlFor="form-desc" className="formControl">Description</label>
          <input id="form-desc" className="form-control" ref={node => { description = node; }} />
        </div>

        <h2 className="heading-small">Or paste existing form data</h2>

        <div className="form-group">
          <textarea id="form-data"
                    name="form-data"
                    className="form-control"
                    ref={node => { formData = node; }}>
          </textarea>
        </div>

        <button type="submit" className="button">Start editing my form!</button>
      </form>
    </div>
  );
};

export default connect()(AddForm);
