import React, { Component } from "react";
import { withTranslation } from 'react-i18next';
import styled from "styled-components";
import FieldError from "./FieldError";
import FieldValid from "./FieldValid";

 class CustomInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      added_class: props.added_class,
      disabled: props.disabled,
      error_message: props.error_message,
      invalid_message: props.invalid_message,
      label: props.label,
      placeholder: props.placeholder,
      valid_message: props.valid_message,
      value: props.value,
    };
  }

  static getDerivedStateFromProps(props, state) {
    return {
        added_class: props.added_class,
        disabled: props.disabled,
        error_message: props.error_message,
        invalid_message: props.invalid_message,
        label: props.label,
        placeholder: props.placeholder,
        valid_message: props.valid_message,
        value: props.value,
    };
  }

  render() {
    const {added_class, disabled, error_message, invalid_message, label, placeholder, valid_message, value} = this.state;
    return (
      <CustomInputStyle className={`field_input input_text ${added_class || ""}`}>
        <div className="field">
            <label data-testid="label">{label}</label>
            <input data-testid="input" disabled={disabled} defaultValue={value} placeholder={placeholder} onChange={evt => {
                if(this.props.on_change){
                    this.props.on_change(evt.target.value);
                }
                else{
                    this.setState({value: evt.target.value});
                }
            }} type="text"/>
        </div>
        {(error_message || invalid_message) &&
            <FieldError error_message={error_message || invalid_message} />
        }
        {valid_message &&
            <FieldValid valid_message={valid_message} />
        }
      </CustomInputStyle>
    );
  }
}

const CustomInputStyle = styled.div`
  border-radius: 6.3px;
  padding: 13px 15px;
  overflow: hidden;
  .field{
    label{
    }
    input{
    }
  }
  @media screen and (max-width: 1199px){
  }
  @media screen and (max-width: 767px){
  }
`;
export default withTranslation('translations')(CustomInput);


