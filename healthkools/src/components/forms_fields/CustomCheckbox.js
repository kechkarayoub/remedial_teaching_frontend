import React, { Component } from "react";
import { withTranslation } from 'react-i18next';
import styled from "styled-components";
import FieldError from "./FieldError";
import FieldValid from "./FieldValid";
import Checkbox from 'react-custom-checkbox';
import { colors } from "../../assets/variables/colors";

 class CustomCheckbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      added_class: props.added_class,
      checked: props.checked,
      disabled: props.disabled,
      error_message: props.error_message,
      invalid_message: props.invalid_message,
      label: props.label,
      valid_message: props.valid_message,
    };
  }

  static getDerivedStateFromProps(props, state) {
    return {
        added_class: props.added_class,
        checked: props.checked,
        disabled: props.disabled,
        error_message: props.error_message,
        invalid_message: props.invalid_message,
        label: props.label,
        valid_message: props.valid_message,
    };
}

  render() {
    const {added_class, disabled, error_message, invalid_message, label, valid_message, checked} = this.state;
    return (
      <CustomCheckboxStyle className={`field_input input_checkbox ${added_class || ""}`}>
        <div className="field">
            <Checkbox icon={
                <div
                  style={{
                    display: "flex",
                    flex: 1,
                    alignSelf: "stretch",
                  }}
                >
                  <i className="fa fa-check checkbox_icon" color={colors.default_color} size={20} />
                </div>
              } 
              onChange={check_value => {
                if(this.props.on_change){
                    this.props.on_change(check_value);
                }
                else{
                    this.setState({checked: check_value});
                }
              }}
              label={label}
              borderColor={colors.default_color} disabled={disabled} checked={checked} className={`input_div ${disabled ? "disabled " : ""}`}
            />
        </div>
        {(error_message || invalid_message) &&
            <FieldError error_message={error_message || invalid_message} />
        }
        {valid_message &&
            <FieldValid valid_message={valid_message} />
        }
      </CustomCheckboxStyle>
    );
  }
}

const CustomCheckboxStyle = styled.div`
  border-radius: 6.3px;
  overflow: hidden;
  padding: 13px 15px;
  .field{
    label{
    }
    .input_div{
      .checkbox_icon{
        color: ${colors.default_color};
      }
      &.disabled{
        opacity: 0.5;
      }
    }
  }
  @media screen and (max-width: 1199px){
  }
  @media screen and (max-width: 767px){
  }
`;
export default withTranslation('translations')(CustomCheckbox);


