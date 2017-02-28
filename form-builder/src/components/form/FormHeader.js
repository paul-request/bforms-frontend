import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getFormById, getCurrentFormId } from '../../reducers';

const FormHeader = ({ form }) => {
  const svgStyle = {
    position: 'absolute',
    width: '0',
    height: '0',
    overflow: 'hidden',
  };

  return (
    <div>
      <svg style={svgStyle} version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
        <defs>
          <symbol id="icon-plus" viewBox="0 0 32 32">
            <title>plus</title>
            <path d="M31 12h-11v-11c0-0.552-0.448-1-1-1h-6c-0.552 0-1 0.448-1 1v11h-11c-0.552 0-1 0.448-1 1v6c0 0.552 0.448 1 1 1h11v11c0 0.552 0.448 1 1 1h6c0.552 0 1-0.448 1-1v-11h11c0.552 0 1-0.448 1-1v-6c0-0.552-0.448-1-1-1z"></path>
          </symbol>
          <symbol id="icon-delete" viewBox="0 0 32 32">
            <title>delete</title>
            <path d="M31.708 25.708c-0-0-0-0-0-0l-9.708-9.708 9.708-9.708c0-0 0-0 0-0 0.105-0.105 0.18-0.227 0.229-0.357 0.133-0.356 0.057-0.771-0.229-1.057l-4.586-4.586c-0.286-0.286-0.702-0.361-1.057-0.229-0.13 0.048-0.252 0.124-0.357 0.228 0 0-0 0-0 0l-9.708 9.708-9.708-9.708c-0-0-0-0-0-0-0.105-0.104-0.227-0.18-0.357-0.228-0.356-0.133-0.771-0.057-1.057 0.229l-4.586 4.586c-0.286 0.286-0.361 0.702-0.229 1.057 0.049 0.13 0.124 0.252 0.229 0.357 0 0 0 0 0 0l9.708 9.708-9.708 9.708c-0 0-0 0-0 0-0.104 0.105-0.18 0.227-0.229 0.357-0.133 0.355-0.057 0.771 0.229 1.057l4.586 4.586c0.286 0.286 0.702 0.361 1.057 0.229 0.13-0.049 0.252-0.124 0.357-0.229 0-0 0-0 0-0l9.708-9.708 9.708 9.708c0 0 0 0 0 0 0.105 0.105 0.227 0.18 0.357 0.229 0.356 0.133 0.771 0.057 1.057-0.229l4.586-4.586c0.286-0.286 0.362-0.702 0.229-1.057-0.049-0.13-0.124-0.252-0.229-0.357z"></path>
          </symbol>
        </defs>
      </svg>

      <div id="skiplink-container">
        <div>
          <a className="skiplink" href="/#content">Skip to main content</a>
        </div>
      </div>

      <header className="with-proposition" id="global-header" role="banner">
        <div className="header-wrapper">
          <div className="header-global">
            <div className="header-logo">
              <Link className="content" to="/" id="logo">
                <img alt="" height="32" src="/static/gov.uk_logotype_crown_invert_trans.png" width="36" /> GOV.UK
              </Link>
            </div>
          </div>
          <div className="header-proposition">
            <div className="content">
              <nav id="proposition-menu">
                <span id="proposition-name">{form.formName}</span>
              </nav>
            </div>
          </div>
        </div>
      </header>

      <div id="global-header-bar"></div>
    </div>
  )
};

const mapStateToProps = (state) => {
  const formId = getCurrentFormId(state);

  return {
    form: getFormById(state, formId),
  };
};

const FormHeaderContainer = connect(
  mapStateToProps,
)(FormHeader);

export default FormHeaderContainer;