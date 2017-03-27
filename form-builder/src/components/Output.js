import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { importForm } from '../actions';
import { getDenormalisedForm, getCurrentFormId } from '../reducers';

class Output extends Component {
  constructor(props) {
    super(props);

    this.state = {
      output: JSON.stringify(props.form, null, 2),
      updated: false,
    };
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      output: JSON.stringify(nextProps.form, null, 2),
      updated: false,
    });
  }

  onChange = (event) => {
    this.setState({
      output: event.target.value,
      updated: true,
    });
  }

  render() {
    return (
      <div className="form-builder__output">
        <div className="form-group">
          <textarea rows="25"
                    className="form-builder__output-editor"
                    onChange={this.onChange}
                    value={this.state.output}>
          </textarea>
        </div>

        <div className="form-group">
          <button className="btn btn-primary"
                  onClick={() => this.props.onHandleFormChange(JSON.parse(this.state.output))}
                  disabled={!this.state.updated}>
            Save changes
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const formId = getCurrentFormId(state);

  return {
    form: getDenormalisedForm(state, formId),
  };
};

const OutputContainer = withRouter(connect(
  mapStateToProps,
  {
    onHandleFormChange: importForm,
  }
)(Output));

export default OutputContainer;
