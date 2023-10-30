import DatePicker from "react-datepicker";
import FieldError from "components/forms_fields/FieldError";
import FieldValid from "components/forms_fields/FieldValid";
import PropTypes from 'prop-types';
import React, { Component } from "react";
import styled from "styled-components";
import { get } from "services/storage";
import { setInitLocale } from "utils/date_picker";
import { withTranslation } from 'react-i18next';

import "react-datepicker/dist/react-datepicker.css";

setInitLocale(get("current_language"));

class CustomDate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      added_class: props.added_class,
      disabled: props.disabled,
      error_message: props.error_message,
      invalid_message: props.invalid_message,
      label: props.label,
      max_date: props.max_date,
      min_date: props.min_date,
      placeholder: props.placeholder,
      valid_message: props.valid_message,
      value: props.value || null,
    };
  }

  static defaultProps = {
    added_class: "",
    disabled: false,
    error_message: "",
    label: "",
    invalid_message: "",
    on_change: null,
    max_date: null,
    min_date: null,
    placeholder: "",
    valid_message: "",
    value: null,
  }

  static getDerivedStateFromProps(props, state) {
    return {
        added_class: props.added_class,
        disabled: props.disabled,
        error_message: props.error_message,
        invalid_message: props.invalid_message,
        label: props.label,
        max_date: props.max_date,
        min_date: props.min_date,
        placeholder: props.placeholder,
        valid_message: props.valid_message,
        value: props.value || null,
    };
  }

  render() {
    const {added_class, disabled, error_message, invalid_message, label, max_date, min_date, placeholder, valid_message, value} = this.state;
    return (
      <CustomDateStyle className={`field_input input_date ${added_class || ""}`}>
        <div className="field">
            <label data-testid="label">{label}</label>
            <DatePicker className={``} minDate={min_date} maxDate={max_date} selected={value} onChange={(date) => {
                if(this.props.on_change){
                  this.props.on_change(date);
                }
                else{
                    this.setState({value: date});
                }
              }} disabled={disabled} placeholderText={placeholder} wrapperClassName={`date_picker_container`}
              locale={get("current_language")}
              dateFormat={get("current_language") === "en" ? "MM/dd/yyyy" : "dd/MM/yyyy"}
            />
        </div>
        {(error_message || invalid_message) &&
            <FieldError error_message={error_message || invalid_message} />
        }
        {valid_message &&
            <FieldValid valid_message={valid_message} />
        }
      </CustomDateStyle>
    );
  }
}

const CustomDateStyle = styled.div`
  border-radius: 6.3px;
  overflow: hidden;
  padding: 13px 15px;
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

CustomDate.propTypes = {
  added_class: PropTypes.string,
  disabled: PropTypes.bool,
  error_message: PropTypes.string,
  label: PropTypes.string,
  invalid_message: PropTypes.string,
  on_change: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]),
  max_date: PropTypes.object,
  min_date: PropTypes.object,
  placeholder: PropTypes.string,
  valid_message: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
};

export default withTranslation('translations')(CustomDate);
