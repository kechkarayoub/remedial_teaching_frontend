import React, { Component } from "react";
import { withTranslation } from 'react-i18next';
import styled from "styled-components";
import FieldError from "components/forms_fields/FieldError";
import FieldValid from "components/forms_fields/FieldValid";
import PropTypes from 'prop-types';

 class CustomGender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      added_class: props.added_class,
      disabled: props.disabled,
      error_message: props.error_message,
      invalid_message: props.invalid_message,
      label: props.label,
      valid_message: props.valid_message,
      value: props.value,
    };
  }

  static defaultProps = {
    added_class: "",
    disabled: false,
    error_message: "",
    label: "",
    invalid_message: "",
    on_change: null,
    t: w => w,
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
      valid_message: props.valid_message,
      value: props.on_change ? props.value : state.value,
    };
  }

  render() {
    const {added_class, disabled, error_message, invalid_message, label, valid_message, value} = this.state;
    return (
      <CustomGenderStyle data-testid="input_gender" className={`field_input input_gender ${added_class || ""}`}>
        <div className="field">
            <label data-testid="label">{label}</label>
            <div className={`choices ${disabled ? 'disabled' : ''}`}>
              <span data-testid={'mars' + (value === 'm' ? '_a' : '')}>
                <i data-testid={'mars_i' + (value === 'm' ? '_a' : '')} className={'fa fa-mars ' + (value === 'm' ? 'active' : '')}
                  onClick={() => {
                    if(!disabled){
                      if(this.props.on_change){
                        this.props.on_change(value === 'm' ? '' : 'm');
                      }
                      else{
                        this.setState({value: value === 'm' ? '' : 'm'});
                      }
                    }
                }}/>{ this.props.t('Male') } 
              </span>
              <span data-testid={'venus' + (value === 'f' ? '_a' : '')}>
                <i data-testid={'venus_i' + (value === 'f' ? '_a' : '')} className={'fa fa-venus ' + (value === 'f' ? 'active' : '')}
                  onClick={() => {
                    if(!disabled){
                      if(this.props.on_change){
                        this.props.on_change(value === 'f' ? '' : 'f');
                      }
                      else{
                        this.setState({value: value === 'f' ? '' : 'f'});
                      }
                    }
                  }}/>{ this.props.t('Female') } 
              </span>
            </div>
        </div>
        {(error_message || invalid_message) &&
            <FieldError error_message={error_message || invalid_message} />
        }
        {valid_message &&
            <FieldValid valid_message={valid_message} />
        }
      </CustomGenderStyle>
    );
  }
}

const CustomGenderStyle = styled.div`
  border-radius: 6.3px;
  overflow: hidden;
  padding: 13px 15px;
  .field{
    .choices{
      i.fa{
        border: 0.8px solid #3eb6ad;
        border-radius: 50%;
        color: #d6d9e0;
        cursor: pointer;
        font-size: 18px;
        height: 34.3px;
        line-height: 34px;
        margin: 0px 10px 0px 10px;
        text-align: center;
        width: 34.3px;
        &.active{
          background-color: #3eb6ad;
          border: solid 0.8px #d6d9e0;
          color:#fff
        }
      }
    }
  }
  @media screen and (max-width: 1199px){
  }
  @media screen and (max-width: 767px){
  }
`;
CustomGender.propTypes = {
  added_class: PropTypes.string,
  disabled: PropTypes.bool,
  error_message: PropTypes.string,
  label: PropTypes.string,
  invalid_message: PropTypes.string,
  on_change: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]),
  t: PropTypes.func,
  valid_message: PropTypes.string,
  value: PropTypes.string,
};
export default withTranslation('translations')(CustomGender);


