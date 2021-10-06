import React, { Component } from "react";
import { withTranslation } from 'react-i18next';
import styled from "styled-components";
import FieldError from "./FieldError";
import FieldValid from "./FieldValid";

 class InputText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      added_class: props.added_class,
      disabled: props.disabled,
      error_message: props.error,
      invalid_message: props.invalid_message,
      label: props.label,
      valid_message: props.valid_message,
      value: props.value,
    };
  }

  static getDerivedStateFromProps(props, state) {
    return {
        added_class: props.added_class,
        disabled: props.disabled,
        error_message: props.error,
        invalid_message: props.invalid_message,
        label: props.label,
        valid_message: props.valid_message,
        value: props.value,
    };
}

  render() {
    const {added_class, disabled, error_message, invalid_message, label, valid_message, value} = this.state;
    return (
      <InputTextStyle className={`field_input input_text ${added_class || ""}`}>
        <div className="field">
            <label>{label}</label>
            <input disabled={disabled} defaultValue={value} placeholder={label} onChange={evt => {
                if(this.props.on_change){
                    this.props.on_change(evt.target.value);
                }
                else{
                    this.setState({value: value});
                }
            }} />
        </div>
        {(error_message || invalid_message) &&
            <FieldError error_message={error_message || invalid_message} />
        }
        {valid_message &&
            <FieldValid valid_message={valid_message} />
        }
      </InputTextStyle>
    );
  }
}

const InputTextStyle = styled.div`
  border-radius: 6.3px;
  box-shadow: 1px 1px 18px 1px rgba(0, 0, 0, 0.1);
  padding: 13px 15px;
  overflow: hidden;
  margin-bottom: 20px;
  margin: 10px 5px;
  width: calc(100% - 10px)!important;
  @media screen and (max-width: 1199px){
  }
  @media screen and (max-width: 767px){
  }
`;
export default withTranslation('translations')(InputText);


