import React, { Component } from "react";
import { withTranslation } from 'react-i18next';
import styled from "styled-components";
import FieldError from "./FieldError";
import FieldValid from "./FieldValid";
import { isValidPhoneNumber } from 'react-phone-number-input';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { get } from "../../services/storage";
import ar from 'react-phone-input-2/lang/ar.json';
import fr from 'react-phone-input-2/lang/fr.json';
// import 'react-phone-number-input/style.css';

 class CustomPhoneNumber extends Component {
  constructor(props) {
    super(props);
    this.state = {
      added_class: props.added_class,
      default_country: props.default_country,
      disabled: props.disabled,
      error_message: props.error_message,
      invalid_message: props.invalid_message,
      is_valid_phone_number: props.is_valid_phone_number,
      label: props.label,
      placeholder: props.placeholder,
      valid_message: props.valid_message,
      value: props.value,
    };
  }

  static getDerivedStateFromProps(props, state) {
    return {
        added_class: props.added_class,
        default_country: props.default_country,
        disabled: props.disabled,
        error_message: props.error_message,
        invalid_message: props.invalid_message,
        is_valid_phone_number: props.is_valid_phone_number,
        label: props.label,
        placeholder: props.placeholder,
        valid_message: props.valid_message,
        value: props.value,
    };
}

  render() {
    const {added_class, disabled, default_country, error_message, invalid_message, label, placeholder, valid_message, value} = this.state;
    var current_language = get("current_language");
    var direction_class = current_language === "ar" ? "rtl" : "ltr";
    return (
      <CustomPhoneNumberStyle className={`field_input input_phone_number ${added_class || ""}`}>
        <div className="field">
            <label data-testid="label">{label}</label>
            <PhoneInput
              placeholder={placeholder} country={(default_country || "").toLowerCase()}
              value={value} disabled={disabled} localization={current_language === "ar" ? ar : current_language === "fr" ? fr : undefined}
              containerStyle={{direction: direction_class}}
              containerClass={"tel_input_container " + direction_class}
              onChange={(phone_number) => {
                if(phone_number){
                  if(this.props.on_change){
                      this.props.on_change(phone_number, isValidPhoneNumber(phone_number));
                  }
                  else{
                      this.setState({value: phone_number, is_valid_phone_number: isValidPhoneNumber(phone_number)});
                  }
                }
              }}
            />
        </div>
        {(error_message || invalid_message) &&
            <FieldError error_message={error_message || invalid_message} />
        }
        {valid_message &&
            <FieldValid valid_message={valid_message} />
        }
      </CustomPhoneNumberStyle>
    );
  }
}

const CustomPhoneNumberStyle = styled.div`
  border-radius: 6.3px;
  padding: 13px 15px;
  // overflow: hidden;
  .field{
    label{
    }
    .tel_input_container{
      input{
        background: #f7f7f7;
        height: 38px;
        width: 100%;
        &:focus{
          background: #f7f7f7;
          box-shadow: 0 0 0 2px #1fa1cf;
        }
      }
      .flag-dropdown{
        &.open{
          .country-list{
            width: 100%;
            min-width: 200px;
          }
        }
      }
      &.rtl{
        input{
          direction: ltr;
          padding-left: 8px;
          padding-right: 48px;
          text-align: right;
        }
        .flag-dropdown{
          border-radius: 0 3px 3px 0;
          .selected-flag{
            padding: 0 8px 0 0;
            .flag{
              .arrow{
                left: unset;
                right: 20px;
              }
            }
          }
        }
      }
    }
  }
  @media screen and (max-width: 1199px){
  }
  @media screen and (max-width: 767px){
  }
`;
export default withTranslation('translations')(CustomPhoneNumber);


