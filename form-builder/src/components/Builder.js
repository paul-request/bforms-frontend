import { connect } from 'react-redux';
import React, { Component } from 'react';
import FormFrame from './form/FormFrame';
import Output from './Output';
import { withRouter } from 'react-router';
import { loadForm } from '../actions';
import { getCurrentFormId } from '../reducers';

class Builder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      output: false,
    };
  }

  componentDidMount = () => {
    const { formId, currentFormId } = this.props;

    // Don't dispatch an action if the form is already loaded
    if (formId !== currentFormId) {
      this.props.onComponentDidMount(formId);
    }
  }

  toggleOutput = () => {
    this.setState({ output: !this.state.output });
  }

  render() {
    return (
      <div className="form-builder">
        <div className="form-builder__actions">
          <div className="panel panel-default">
            <div className="panel-heading">
              Form Builder Menu
            </div>

            <div className="panel-body">
              <button className="btn btn-default"
                      onClick={() => this.toggleOutput()}>
                Toggle JSON output
              </button>
            </div>
          </div>
        </div>

        <div className={`form-builder__view${this.state.output? ' sr-only' : ''}`}>
          <FormFrame />
        </div>

        <div className={`form-builder__view${this.state.output? '' : ' sr-only'}`}>
          <Output />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, { params }) => {
  const currentFormId = getCurrentFormId(state);

  return {
    formId: params.formId,
    currentFormId,
  };
};

const BuilderContainer = withRouter(connect(
  mapStateToProps,
  {
    onComponentDidMount: loadForm,
  },
)(Builder));

export default BuilderContainer;
