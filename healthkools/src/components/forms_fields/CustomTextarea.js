import FieldError from "components/forms_fields/FieldError";
import FieldValid from "components/forms_fields/FieldValid";
import PropTypes from 'prop-types';
import React, { Component } from "react";
import styled from "styled-components";
import { withTranslation } from 'react-i18next';

class CustomTextarea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      added_class: props.added_class,
      disabled: props.disabled,
      error_message: props.error_message,
      invalid_message: props.invalid_message,
      label: props.label,
      placeholder: props.placeholder,
      rows: props.rows,
      valid_message: props.valid_message,
      value: props.value,
    };
  }

  static defaultProps = {
    added_class: "",
    disabled: false,
    error_message: "",
    invalid_message: "",
    label: "",
    on_change: null,
    placeholder: "",
    rows: 4,
    valid_message: "",
    value: "",
  };

  static getDerivedStateFromProps(props, state) {
    return {
        added_class: props.added_class,
        disabled: props.disabled,
        error_message: props.error_message,
        invalid_message: props.invalid_message,
        label: props.label,
        placeholder: props.placeholder,
        rows: props.rows,
        valid_message: props.valid_message,
        value: props.value,
    };
  }

  render() {
    const {added_class, disabled, error_message, invalid_message, label, placeholder, rows, valid_message, value} = this.state;
    return (
      <CustomTextareaStyle className={`field_input input_textarea ${added_class || ""}`}>
        <div className="field">
            <label data-testid="label">{label}</label>
            <textarea data-testid="textarea" disabled={disabled} defaultValue={value} placeholder={placeholder} rows={rows}
              onChange={evt => {
                if(this.props.on_change){
                    this.props.on_change(evt.target.value);
                }
                else{
                    this.setState({value: evt.target.value});
                }
            }}/>
        </div>
        {(error_message || invalid_message) &&
            <FieldError error_message={error_message || invalid_message} />
        }
        {valid_message &&
            <FieldValid valid_message={valid_message} />
        }
      </CustomTextareaStyle>
    );
  }
}

const CustomTextareaStyle = styled.div`
  border-radius: 6.3px;
  overflow: hidden;
  padding: 13px 15px;
  .field{
    label{
    }
  }
  &.no_resize{
    textarea{
      resize: none;
    }
  }
  @media screen and (max-width: 1199px){
  }
  @media screen and (max-width: 767px){
  }
`;

CustomTextarea.propTypes = {
  added_class: PropTypes.string,
  disabled: PropTypes.bool,
  error_message: PropTypes.string,
  invalid_message: PropTypes.string,
  label: PropTypes.string,
  on_change: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]),
  placeholder: PropTypes.string,
  rows: PropTypes.number,
  valid_message: PropTypes.string,
  value: PropTypes.string,
};

export default withTranslation('translations')(CustomTextarea);
