import React, { Component } from "react";
import { withTranslation } from 'react-i18next';
import styled from "styled-components";
import FieldError from "./FieldError";
import FieldValid from "./FieldValid";
import moment from "moment";
import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import fr from "date-fns/locale/fr";
import "react-datepicker/dist/react-datepicker.css";
import { get } from "../../services/storage";
import { setInitLocale } from "../../utils/date_picker";
setInitLocale(get("current_language"));

class HKDate extends Component {
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
      value: props.value || null,
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
        value: props.value || null,
    };
}

  render() {
    const {added_class, disabled, error_message, invalid_message, label, placeholder, valid_message, value} = this.state;
    return (
      <HKDateStyle className={`field_input input_date ${added_class || ""}`}>
        <div className="field">
            <label data-testid="label">{label}</label>
            <DatePicker className={``} maxDate={moment().add(-6, "years").toDate()} selected={value} onChange={(date) => {
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
      </HKDateStyle>
    );
  }
}

const HKDateStyle = styled.div`
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
export default withTranslation('translations')(HKDate);


