import React, { Component } from "react";
import { withTranslation } from 'react-i18next';
import styled from "styled-components";
import FieldError from "./FieldError";
import FieldValid from "./FieldValid";
import PasswordStrengthBar from 'react-password-strength-bar';
class HKPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      added_class: props.added_class,
      disabled: props.disabled,
      error_message: props.error_message,
      invalid_message: props.invalid_message,
      label: props.label,
      placeholder: props.placeholder,
      show_password: false,
      show_trength_bar: props.show_trength_bar,
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
        show_trength_bar: props.show_trength_bar,
        valid_message: props.valid_message,
        value: props.value,
    };
}

  render() {
    const {added_class, disabled, error_message, invalid_message, label, placeholder, show_password, show_trength_bar, valid_message, value} = this.state;
    return (
      <HKPasswordStyle className={`field_input input_password ${added_class || ""}`}>
        <div className="field">
            <label data-testid="label">{label}</label>
            <div className="input_div">
              <input data-testid="input" disabled={disabled} defaultValue={value} placeholder={placeholder} onChange={evt => {
                  if(this.props.on_change){
                      this.props.on_change(evt.target.value);
                  }
                  else{
                      this.setState({value: evt.target.value});
                  }
              }} type={show_password ? "text" : "password"}/>
              <i data-testid="toggle_show_password" className={`show_hide_password fa ${show_password ? "fa-eye" : "fa-eye-slash"}`} onClick={() => this.setState({show_password: !show_password})}></i>
              {show_trength_bar &&
                <PasswordStrengthBar password={value} shortScoreWord={this.props.t("Too short")}
                  scoreWords={[this.props.t("Weak"), this.props.t("Weak"), this.props.t("Okay"), this.props.t("Good"), this.props.t("Strong")]}/>
              }
            </div>
        </div>
        {(error_message || invalid_message) &&
            <FieldError error_message={error_message || invalid_message} />
        }
        {valid_message &&
            <FieldValid valid_message={valid_message} />
        }
      </HKPasswordStyle>
    );
  }
}

const HKPasswordStyle = styled.div`
  border-radius: 6.3px;
  padding: 13px 15px;
  overflow: hidden;
  .field{
    label{
    }
    .input_div{
      position: relative;
      .show_hide_password{
        cursor: pointer;
        position: absolute;
        right: 5px;
        top: 19px;
        transform: translateY(-50%);
      }
      input{
        padding-right: 25px;
      }
    }
  }
  @media screen and (max-width: 1199px){
  }
  @media screen and (max-width: 767px){
  }
`;
export default withTranslation('translations')(HKPassword);


