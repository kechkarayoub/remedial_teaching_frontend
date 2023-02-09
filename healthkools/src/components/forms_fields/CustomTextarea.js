import React, { Component } from "react";
import { withTranslation } from 'react-i18next';
import styled from "styled-components";
import FieldError from "components/forms_fields/FieldError";
import FieldValid from "components/forms_fields/FieldValid";

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
export default withTranslation('translations')(CustomTextarea);


