import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { createForm, addForm, addSection, addField } from '../actions';
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

  toggleForm = (e) => {
    e.preventDefault();

    this.setState(prevState => ({
      startFromScratch: !prevState.startFromScratch,
    }));
  }

  handleNewSubmit = (e) => {
    e.preventDefault();

    const { title, description } = this.state;
    const hasDetails = title.value.trim() || description.value.trim();

    if (!hasDetails) return;

    const data = {
      formName: title.value,
      description: description.value,
    };
    const action = createForm(data);

    this.props.dispatch(action);
    browserHistory.push(`/form-builder/${action.payload.form.id}`);
  }

  handleExistingSubmit = (e) => {
    e.preventDefault();

    const { formData } = this.state;
    const hasData = formData.value;

    if (!hasData) return;

    // TODO: handle invalid JSON with try catch and return an error to display to the user?
    // Need to work out a good way to do this...
    // Maybe some sort of overall validation on submit?

    // if isValid, else add error and display somehow. Look it up
    // Actually need to go through, chec k the structure and use correct JSON format here
    const data = JSON.parse(formData.value);
    const action = addForm(data);

    this.props.dispatch(action);

    if (action.payload.form.sections) {
      action.payload.form.sections.forEach(section => {
        const editSectionAction = editSection(action.payload.form.id, section);
        this.props.dispatch(editSectionAction);

        if (section.fields) {
          section.fields.forEach(field => {
            const editFieldAction = editField(editSectionAction.payload.section.id, field);
            this.props.dispatch(editFieldAction);
          });
        }
      });
    }

    browserHistory.push(`/form-builder/${action.payload.form.id}`);
  }

  render() {
    return (
      <div>
        <div className={`${this.state.startFromScratch ? '' : 'js-hidden'}`}>
          <form onSubmit={(e) => this.handleNewSubmit(e)}>
            <div className="section">
              <h2 className="heading-small">Create a form from scratch</h2>

              <div className="form-group">
                <label htmlFor="form-title" className="formControl">Title</label>
                <input id="form-title" className="form-control" ref={node => { this.state.title = node; }} />
              </div>

              <div className="form-group">
                <label htmlFor="form-desc" className="formControl">Description</label>
                <input id="form-desc" className="form-control" ref={node => { this.state.description = node; }} />
              </div>

              <div className="form-group">
                <button type="submit" className="button">Create form</button>
              </div>

              <p><a href="#" onClick={this.toggleForm}>Or edit an existing form</a></p>
            </div>
          </form>
        </div>

        <div className={`${this.state.startFromScratch ? 'js-hidden' : ''}`}>
          <form onSubmit={(e) => this.handleExistingSubmit(e)}>
            <div className="section">
              <h2 className="heading-small">Edit an existing form</h2>

              <div className="form-group">
                <textarea id="form-data"
                          name="form-data"
                          className="form-control"
                          ref={node => { this.state.formData = node; }}>
                </textarea>
              </div>

              <div className="form-group">
                <button type="submit" className="button">Create form</button>
              </div>

              <p><a href="#" onClick={this.toggleForm}>Or start from scratch</a></p>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default connect()(AddForm);
