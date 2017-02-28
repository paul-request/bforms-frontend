import { connect } from 'react-redux';
import React, { Component } from 'react';
import Frame from 'react-frame-component';
import FormHeader from './FormHeader';
import Form from './Form';
import FormFooter from './FormFooter';
import { findDOMNode } from 'react-dom';
import { getFormById, getCurrentFormId } from '../reducers';

class FormFrame extends Component {
  componentDidMount = () => {
    const iframe = findDOMNode(this);

    // This is a hack, but seems to do thee trick, as well as wrapping all the
    // child components in one component!?
    // setTimeout(() => {
    //   iframe.height = `${iframe.contentWindow.document.body.scrollHeight}px`;
    // }, 100);
  }

  render() {
    const styles = {
      border: 'none',
      width: '100%',
      heioght: '100%',
    };
    const initialContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <link href="/static/govuk-template.css" media="screen" rel="stylesheet" />
        <link href="/static/govuk-template-print.css" media="print" rel="stylesheet" />
        <link href="/static/fonts.css" media="all" rel="stylesheet" />
        <link href="/static/application.css" media="screen" rel="stylesheet" type="text/css" />
        <link href="/static/form.css" media="screen" rel="stylesheet" type="text/css" />
      </head>

      <body>
        <div id="mount-iframe-content"></div>
      </body>
      </html>
    `;

    return (
      <Frame style={styles}
             initialContent={initialContent}
             mountTarget='#mount-iframe-content'>
       <FormHeader />
       <Form />
       <FormFooter />
      </Frame>
    );
  }
}

export default FormFrame;
