import { connect } from 'react-redux';
import React, { Component } from 'react';

const Field = ({ id, label }) => (
  <div className="form-group">
    <label htmlFor="{id}">{label}</label>
    <input type="text" id="{id}" name="{id}" />
  </div>
);

export default Field;
