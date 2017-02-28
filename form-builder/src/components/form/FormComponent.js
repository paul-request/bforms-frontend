import React, { Component } from 'react';

class FormComponent extends Component {
  constructor (props) {
    super(props);

    this.state = {
      isHovering: false,
    };

    this.mouseOver = this.mouseOver.bind(this);
    this.mouseOut = this.mouseOut.bind(this);
  }

  mouseOver(event) {
    event.stopPropagation();

    this.setState({ isHovering: true });
  }

  mouseOut(event) {
    event.stopPropagation();

    this.setState({ isHovering: false });
  }
}

export default FormComponent;
