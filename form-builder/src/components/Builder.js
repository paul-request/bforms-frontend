import React, { Component } from 'react';
import Form from './Form';
import Output from './Output';
import { connect } from 'react-redux';

class Builder extends Component {
  constructor() {
    super();

    this.state = {
      output: false,
    };
  }

  toggleOutput = () => {
    this.setState({ output: !this.state.output });
  }

  render() {
    return (
      <div>
        <div className="form-builder__actions">
          <div className="form-actions">
            <button className="button"
                    onClick={() => this.toggleOutput()}>
              Toggle output view
            </button>
          </div>
        </div>

        <div className={`form-view${this.state.output? ' js-hidden' : ''}`}>
          <Form />
        </div>

        <div className={`form-view${this.state.output? '' : ' js-hidden'}`}>
          <Output />
        </div>
      </div>
    );
  }
}

export default Builder;
