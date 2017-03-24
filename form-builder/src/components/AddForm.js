import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { createForm, importForm } from '../actions';
import { browserHistory } from 'react-router';

class AddForm extends Component {
  constructor() {
    super();

    this.state = {
      startFromScratch: true,
      title: null,
      description: null,
      formData: null,
      errors: [],
    };
  }

  toggleForm = (event) => {
    event.preventDefault();

    this.setState(prevState => ({
      startFromScratch: !prevState.startFromScratch,
    }));
  }

  handleCreate = (event) => {
    event.preventDefault();

    const { title, description } = this.state;
    const hasDetails = title.value.trim() || description.value.trim();

    if (!hasDetails) return;

    const data = {
      formName: title.value,
      description: description.value,
    };
    const action = createForm(data);

    this.props.dispatch(action);
    browserHistory.push(`/form-builder/${action.payload.form.formTypeId}`);
  }

  handleImport = (event) => {
    event.preventDefault();

    const { formData } = this.state;

    if (!formData.value) return;

    // TODO: handle invalid JSON with try catch and return an error to display to the user?
    // Need to work out a good way to do this...
    // Maybe some sort of overall validation on submit?

    const data = JSON.parse(formData.value);
    const importFormAction = importForm(data);

    this.props.dispatch(importFormAction);
    browserHistory.push(`/form-builder/${importFormAction.payload.form.formTypeId}`);
  }

  render() {
    return (
      <div className="well">
        <div className={`${this.state.startFromScratch ? '' : 'hidden'}`}>
          <form onSubmit={this.handleCreate}>
            <h2 className="h3">Create a form from scratch</h2>

            <div className="form-group">
              <label htmlFor="form-title" className="form-label">Title</label>
              <input id="form-title" className="form-control" ref={node => { this.state.title = node; }} />
            </div>

            <div className="form-group">
              <label htmlFor="form-desc" className="form-label">Description</label>
              <input id="form-desc" className="form-control" ref={node => { this.state.description = node; }} />
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-success">Create form</button>
            </div>

            <p><a href="#" onClick={this.toggleForm}>Or import an existing form</a></p>
          </form>
        </div>

        <div className={`${this.state.startFromScratch ? 'hidden' : ''}`}>
          <form onSubmit={this.handleImport}>
            <h2 className="h3">Import an existing form</h2>

            <div className="form-group">
              <textarea id="form-data"
                        name="form-data"
                        className="form-control"
                        rows="15"
                        ref={node => { this.state.formData = node; }}>
              </textarea>
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-success">Create form</button>
            </div>

            <p><a href="#" onClick={this.toggleForm}>Or start from scratch</a></p>
          </form>
        </div>
      </div>
    );
  }
}

export default connect()(AddForm);
