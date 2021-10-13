import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import styled from "styled-components";

import DatePicker from "react-datepicker";
import $ from 'jquery';
import { withTranslation, Trans, composeInitialProps } from 'react-i18next';
import { get_geo_info, check_if_email_or_username_exists_api_get } from '../../../services/api';
import { get_contries_select_options } from '../../../utils/countries_list';
import moment from 'moment';
import { get } from "../../../services/storage";
import HKGender from "../../../components/forms_fields/HKGender";
import HKDate from "../../../components/forms_fields/HKDate";
import HKInput from "../../../components/forms_fields/HKInput";
import HKPassword from "../../../components/forms_fields/HKPassword";
import HKSelect from "../../../components/forms_fields/HKSelect";
import HKTextarea from "../../../components/forms_fields/HKTextarea";

class SignInUpModal extends Component {
  constructor(props) {
    super(props);
    this.state= {
      address: "",
      birthday: null,//moment().add(-30, "years").toDate(),
      country_code: "",
      country_name: "",
      current_language: get("current_language"),
      default_view: props.default_sign_in_up_view,
      email: "",
      error_messages: {},
      first_name: "",
      gender: "",
      invalid_messages: {},
      is_submitting: false,
      last_name: "",
      password: "",
      password_confirmation: "",
      phone_number: "",
      username: "",
      valid_messages: {},
    };
    this.geo_info_api_done = true;
    this.countries_options = get_contries_select_options(get("current_language"), this.props.t);
  }

  componentDidMount(){
    this.getGeoInfo();
  }
  static getDerivedStateFromProps(props, state) {
    var current_language = get("current_language");
    if(current_language !== state.current_language){
      var new_state = {current_language: current_language};
      return new_state;
    }
    return null;
  }
  componentDidUpdate(prevProps, prevState){
    var new_state = {};
    if(prevState.current_language !== this.state.current_language){
      this.countries_options = get_contries_select_options(this.state.current_language);
      new_state.random = parseInt(Math.random() * 100000);
    }
    if(Object.keys(new_state).length !== 0){
      this.setState(new_state);
    }
  }

  getGeoInfo = () => {
    if(this.geo_info_api_done){
      this.geo_info_api_done = false;
      const api_key = process.env.REACT_APP_GEOLOCATION_DB_API_KEY;
      get_geo_info(api_key).then(res => {
        this.geo_info_api_done = true;
        this.setState({
          country_code: res.country_code,
        });
      })
      .catch(err => {
        this.geo_info_api_done = true;
      });
    }
  }

  handleFieldChange = (val, field, val2) => {
    var state = this.state;
    state[field] = val;
    if(field === "email"){
      if(val){
        if(this.typingTimerEmail){
          clearTimeout(this.typingTimerEmail);
        }
        this.typingTimerEmail = setTimeout(() => {
          var data = {
            email_or_username: val,
            current_language: this.state.current_language,
          };
          check_if_email_or_username_exists_api_get(data).then(res => {
            if(res.user_exists){
              state.invalid_messages.email = res.message;
              state.valid_messages.email = undefined;
            }
            else{
              state.invalid_messages.email = undefined;
              state.valid_messages.email = undefined;
            }
            this.setState(state);
          });
        }, 500);
      }
      else{
        state.invalid_messages.email = undefined;
        state.valid_messages.email = undefined;
        this.setState(state);
      }
    }
    else if(field === "username"){
      if(val){
        if(this.typingTimerUsername){
          clearTimeout(this.typingTimerUsername);
        }
        this.typingTimerUsername = setTimeout(() => {
          var data = {
            email_or_username: val,
            current_language: this.state.current_language,
          };
          check_if_email_or_username_exists_api_get(data).then(res => {
            if(res.user_exists){
              state.invalid_messages.username = res.message;
              state.valid_messages.username = undefined;
            }
            else{
              state.invalid_messages.username = undefined;
              state.valid_messages.username = undefined;
            }
            this.setState(state);
          }).catch(err => {
            console.log(err);
          });
        }, 500);
      }
      else{
        state.invalid_messages.username = undefined;
        state.valid_messages.username = undefined;
        this.setState(state);
      }
    }
    else if(field === "country_code"){
      state.country_name = val2;
      this.setState(state);
    }
    else if(field === "password"){
      if(val && state.password_confirmation && val !== state.password_confirmation){
        state.invalid_messages.password_confirmation = this.props.t("Passwords not match");
      }
      else{
        state.invalid_messages.password_confirmation = null;
      }
      this.setState(state);
    }
    else if(field === "password_confirmation"){
      if(val && state.password && val !== state.password){
        state.invalid_messages.password_confirmation = this.props.t("Passwords not match");
      }
      else{
        state.invalid_messages.password_confirmation = null;
      }
      this.setState(state);
    }
    else{
      this.setState(state);
    }
  }

//   componentDidMount(){
//     $('.selectpicker').selectpicker();
//   }

//   componentDidUpdate() {
//     $('.selectpicker').selectpicker("refresh");
//   }


  render() {
    var pat = /^http?:\/\//i;
    const {address, birthday, country_code, current_language, default_view, email, error_messages, first_name, gender,
      invalid_messages, last_name, password, password_confirmation, username, valid_messages} = this.state;
    return (
      <>
      <Modal
        show={this.props.show} 
        onHide={() => this.props.onHide()}
        className={`custom_modal sign_in_up_modal ${current_language == "ar" ? "rtl" : ""}`}
        animation={false}
      >
        <SignInUpModalModal>
          <Modal.Header>
            <span className="visibility_hidden"></span>
            { this.props.t(default_view === "sign_in" ? 'Sign in' : 'Sign up') }
            <Button variant="circle" className="close-modal" onClick={() => this.props.onHide()}>
                <span className="close_ico">×</span>
            </Button>
          </Modal.Header>
          <Modal.Body data-testid="body">
            <Row>
              <HKInput added_class="col-12 col-md-6" label={this.props.t("First name")} placeholder={this.props.t("First name")} 
                value={first_name} invalid_message={invalid_messages.first_name} valid_message={valid_messages.first_name}
                error_message={error_messages.first_name} on_change={(val) => this.handleFieldChange(val, "first_name")}/>
              <HKInput added_class="col-12 col-md-6" label={this.props.t("Last name")} placeholder={this.props.t("Last name")} 
                value={last_name} invalid_message={invalid_messages.last_name} valid_message={valid_messages.last_name}
                error_message={error_messages.last_name} on_change={(val) => this.handleFieldChange(val, "last_name")}/>
              <HKInput added_class="col-12 col-md-6" label={this.props.t("Email")} placeholder={this.props.t("Email")} 
                value={email} invalid_message={invalid_messages.email} valid_message={valid_messages.email}
                error_message={error_messages.email} on_change={(val) => this.handleFieldChange(val, "email")}/>
              <HKInput added_class="col-12 col-md-6" label={this.props.t("Username")} placeholder={this.props.t("Username")} 
                value={username} invalid_message={invalid_messages.username} valid_message={valid_messages.username}
                error_message={error_messages.username} on_change={(val) => this.handleFieldChange(val, "username")}/>
              <HKPassword added_class="col-12 col-md-6" label={this.props.t("Password")} placeholder={this.props.t("Password")} 
                value={password} invalid_message={invalid_messages.password} valid_message={valid_messages.password}
                error_message={error_messages.password} on_change={(val) => this.handleFieldChange(val, "password")}/>
              <HKPassword added_class="col-12 col-md-6" label={this.props.t("Confirm password")} placeholder={this.props.t("Confirm password")} 
                value={password_confirmation} invalid_message={invalid_messages.password_confirmation} valid_message={valid_messages.password_confirmation}
                error_message={error_messages.password_confirmation} on_change={(val) => this.handleFieldChange(val, "password_confirmation")}/>
              <HKDate added_class="col-12 col-md-6" label={this.props.t("Date of Birth")} placeholder={this.props.t("Date of Birth")} 
                value={birthday} invalid_message={invalid_messages.birthday} valid_message={valid_messages.birthday}
                error_message={error_messages.birthday} on_change={(val) => this.handleFieldChange(val, "birthday")}/>
              <HKGender added_class="col-12 col-md-6" label={this.props.t("Gender")} 
                value={gender} invalid_message={invalid_messages.gender} valid_message={valid_messages.gender}
                error_message={error_messages.gender} on_change={(val) => this.handleFieldChange(val, "gender")}/>
              <HKSelect added_class="col-12 col-md-6" label={this.props.t("Country")} countries_options={this.countries_options}
                placeholder={this.props.t("Choose a country")} value={country_code} current_language={current_language}
                invalid_message={invalid_messages.country_code} valid_message={valid_messages.country_code} 
                error_message={error_messages.country_code} on_change={(val, val2) => this.handleFieldChange(val, "country_code", val2)}/>
              <HKTextarea added_class="col-12 col-md-12 no_resize" label={this.props.t("Address")} placeholder={this.props.t("Address")} 
                value={address} invalid_message={invalid_messages.address} valid_message={valid_messages.address} rows={2}
                error_message={error_messages.address} on_change={(val) => this.handleFieldChange(val, "address")}/>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            
          </Modal.Footer>
        </SignInUpModalModal>
      </Modal>
      </>
    );
  }
}
const SignInUpModalModal = styled.div`
  height: 100%;
  padding: 10px 25px;
  .modal-header{
    color: #1fa1cf;
    font-weight: bold;
    padding: 5px 0;
    .close-modal{
      background-image: linear-gradient(225deg,#67d3f9,#1fa1cf);
      border-radius: 50%;
      box-shadow: 0 10px 20px 0 #1fa1cf5c;
      color: #fff;
      font-size: 40px;
      height: 30px;
      line-height: 30px;
      padding: 0;
      text-align: center;
      width: 30px;
      .close_ico{
        display: block;
        height: 100%;
        line-height: 24px;
        padding-bottom: 6px;
      }
    }
  }
  .modal-body{
    padding: 10px 0;
  }
`;
export default withTranslation('translations')(SignInUpModal);
