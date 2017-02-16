import { connect } from 'react-redux';
import React, { Component } from 'react';
import Fields from './Fields';

const Section = ({ id, title, description }) => (
  <div className="section">
    <h2 className="heading-medium">{title}</h2>

    {description &&
      <p>{description}</p>
    }

    <Fields sectionId={id}/>
  </div>
);

export default Section;
