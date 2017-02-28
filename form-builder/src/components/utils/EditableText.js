import React, { Component, PropTypes } from 'react';
import { KEYS } from '../../constants';

class EditableText extends Component {
  constructor(props) {
    super(props);

    console.log('EditableText: PROPS', props)

    const { value } = props;

    this.state = {
      isEditing: false,
      value,
    };

    this.handleBlur = this.handleBlur.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.change = this.change.bind(this);
  }

  change = (event) => {
    this.setState({ value: event.currentTarget.value });
  }

  handleBlur = (event) => {
    this.setState({ isEditing: false });

    this.props.onSave({
      [this.props.propertyKey]: this.state.value,
    });
  }

  handleClick = () => {
    this.setState({ isEditing: true });
  }

  render() {
    return (
      <span className="editable-field" onClick={this.handleClick}>
        {
          this.state.isEditing ? (
            <input type="text"
                   className="editable-field__input"
                   onBlur={this.handleBlur}
                   onChange={this.change}
                   value={this.state.value} />
          ): (
            this.state.value
          )
        }
      </span>
    )
  }
}

EditableText.propTypes = {
  value: PropTypes.string.isRequired,
  propertyKey: PropTypes.string.isRequired,
};

export default EditableText;
