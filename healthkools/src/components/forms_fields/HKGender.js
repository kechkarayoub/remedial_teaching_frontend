import React, { Component } from "react";
import { withTranslation } from 'react-i18next';
import styled from "styled-components";
import FieldError from "./FieldError";
import FieldValid from "./FieldValid";

 class HKGender extends Component {
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
      value: props.on_change ? props.value : state.value,
    };
  }

  render() {
    const {added_class, disabled, error_message, invalid_message, label, valid_message, value} = this.state;
    return (
      <HKGenderStyle data-testid="input_gender" className={`field_input input_gender ${added_class || ""}`}>
        <div className="field">
            <label data-testid="label">{label}</label>
            <div className={`choices ${disabled ? 'disabled' : ''}`}>
              <span data-testid={'mars' + (value === 'm' ? '_a' : '')}>
                <i data-testid={'mars_i' + (value === 'm' ? '_a' : '')} className={'fa fa-mars ' + (value === 'm' ? 'active' : '')}
                  onClick={() => {
                    if(this.props.on_change){
                      this.props.on_change(value === 'm' ? '' : 'm');
                    }
                    else{
                      this.setState({value: value === 'm' ? '' : 'm'});
                    }
                }}/>{ this.props.t('Male') } 
              </span>
              <span data-testid={'venus' + (value === 'f' ? '_a' : '')}>
                <i data-testid={'venus_i' + (value === 'f' ? '_a' : '')} className={'fa fa-venus ' + (value === 'f' ? 'active' : '')}
                  onClick={() => {
                    if(this.props.on_change){
                      this.props.on_change(value === 'f' ? '' : 'f');
                    }
                    else{
                      this.setState({value: value === 'f' ? '' : 'f'});
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
      </HKGenderStyle>
    );
  }
}

const HKGenderStyle = styled.div`
  border-radius: 6.3px;
  padding: 13px 15px;
  overflow: hidden;
  .field{
    .choices{
      i.fa{
        cursor:pointer;
        width: 34.3px;
        height: 34.3px;
        margin: 10px 10px 10px 10px;
        cursor: pointer;
        border: 0.8px solid #3eb6ad;
        border-radius: 50%;
        color: #d6d9e0;
        font-size: 18px;
        line-height: 34px;
        text-align: center;
        &.active{
          border: solid 0.8px #d6d9e0;
          background-color:#3eb6ad;
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
export default withTranslation('translations')(HKGender);


