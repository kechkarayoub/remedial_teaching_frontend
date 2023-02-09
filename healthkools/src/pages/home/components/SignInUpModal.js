import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import styled from "styled-components";

import DatePicker from "react-datepicker";
import $ from 'jquery';
import { withTranslation, Trans, composeInitialProps } from 'react-i18next';
import { get_geo_info, check_if_email_or_username_exists_api_get } from 'services/api';
import { get_contries_select_options } from 'utils/countries_list';
import { format_as_date } from 'utils/datetime_format';
import moment from 'moment';
import SignInUpConfirmationModal from './SignInUpConfirmationModal';
import OAuthButtonContainer from './OAuthButtonContainer';
import { get } from "services/storage";
import { register } from "services/api";
import CustomTSNotice from "components/forms_fields/CustomTSNotice";
import CustomGender from "components/forms_fields/CustomGender";
import CustomDate from "components/forms_fields/CustomDate";
import CustomInput from "components/forms_fields/CustomInput";
import CustomPassword from "components/forms_fields/CustomPassword";
import CustomPhoneNumber from "components/forms_fields/CustomPhoneNumber";
import CustomSelect from "components/forms_fields/CustomSelect";
import CustomTextarea from "components/forms_fields/CustomTextarea";
import CustomButton from "components/CustomButton";
import QuestionButton from "components/QuestionButton";
import * as EmailValidator from 'email-validator';
import FieldError from "components/forms_fields/FieldError";
import {login_action} from "store/actions";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";
const usernameRegex = /^[a-zA-Z0-9_]+$/;

class SignInUpModal extends Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state= {
      address: "",
      birthday: moment().add(-30, "years").toDate(),
      country_code: "",
      country_name: "",
      current_language: get("current_language"),
      default_view: props.default_sign_in_up_view || "sign_in",
      email: "",
      error_messages: {},
      first_name: "",
      gender: "",
      invalid_messages: {},
      is_submitting: false,
      is_valid_phone_number: false,
      last_name: "",
      password: "",
      password_sign_in: "",
      password_confirmation: "",
      phone_number: "",
      registration_label: this.props.t("Sign up"),
      username: "",
      email_or_username: "",
      valid_messages: {},
    };
    this.geo_info_api_done = true;
    this.countries_options = get_contries_select_options(get("current_language"), this.props.t);
  }

  componentDidMount(){
    this._isMounted = true;
    this.getGeoInfo();
  }

  componentWillUnmount(){
    this._isMounted = false;
  }
  static getDerivedStateFromProps(props, state) {
    var current_language = get("current_language");
    if(current_language !== state.current_language || props.default_sign_in_up_view !== state.default_view){
      var new_state = {
        current_language: current_language,
        default_view: props.default_sign_in_up_view,
      };
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

  getClearedFormState = () => {
    return {
      address: "",
      birthday: moment().add(-30, "years").toDate(),
      current_language: get("current_language"),
      email: "",
      error_messages: {},
      first_name: "",
      gender: "",
      invalid_messages: {},
      is_submitting: false,
      is_valid_phone_number: false,
      last_name: "",
      password: "",
      password_confirmation: "",
      phone_number: "",
      registration_label: this.props.t("Sign up"),
      username: "",
      valid_messages: {},
    };
  }

  handleFieldChange = (val, field, val2) => {
    var state = this.state;
    state[field] = val;
    state.error_messages[field] = undefined;
    state.invalid_messages[field] = undefined;
    state.network_error = undefined;
    if(field === "email"){
      if(val){
        if(this.typingTimerEmail){
          clearTimeout(this.typingTimerEmail);
        }
        this.typingTimerEmail = setTimeout(() => {
          if(!EmailValidator.validate(val)){
            state.invalid_messages.email = this.props.t("This email is invalid");
            this.setState(state);
          }
          else{
            // state.invalid_messages.email = undefined;
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
              if(this._isMounted){
                this.setState(state);
              }
            }).catch(err => {
              state.network_error = this.props.t("Network error!");
              if(this._isMounted){
                this.setState(state);
              }
              console.log(err);
            });
          }
        }, 500);
      }
      else{
        state.invalid_messages.email = undefined;
        state.valid_messages.email = undefined;
        if(this._isMounted){
          this.setState(state);
        }
      }
    }
    else if(field === "username"){
      if(val){
        if(this.typingTimerUsername){
          clearTimeout(this.typingTimerUsername);
        }
        this.typingTimerUsername = setTimeout(() => {
          if(!usernameRegex.test(val)){
            state.invalid_messages.username = this.props.t("This username is invalid");
            this.setState(state);
          }
          else{
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
              if(this._isMounted){
                this.setState(state);
              }
            }).catch(err => {
              state.network_error = this.props.t("Network error!");
              if(this._isMounted){
                this.setState(state);
              }
              console.log(err);
            });
          }
        }, 500);
      }
      else{
        state.invalid_messages.username = undefined;
        state.valid_messages.username = undefined;
        if(this._isMounted){
          this.setState(state);
        }
      }
    }
    else if(field === "country_code"){
      state.country_name = val2;
      this.setState(state);
    }
    else if(field === "phone_number"){
      state.is_valid_phone_number = val2;
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

  handleRegistration = () => {
    const {address, birthday, country_code, current_language, email, error_messages, first_name, gender,
      invalid_messages, is_valid_phone_number, last_name, password, password_confirmation,
      phone_number, username} = this.state;
    var valid_form = true;
    var new_state = {
      network_error: undefined,
    };
    var data = {
      address: address,
      birthday: format_as_date(birthday),
      country_code: country_code,
      current_language: current_language,
      gender: gender,
      is_valid_phone_number: is_valid_phone_number,
      phone_number: phone_number,
    };
    if(!email){
      error_messages.email = this.props.t("This field is required");
      valid_form = false;
    }
    else if(invalid_messages.email){
      valid_form = false;
    }
    else{
      data.email = email;
    }
    if(!first_name){
      error_messages.first_name = this.props.t("This field is required");
      valid_form = false;
    }
    else{
      data.first_name = first_name;
    }
    if(!last_name){
      error_messages.last_name = this.props.t("This field is required");
      valid_form = false;
    }
    else{
      data.last_name = last_name;
    }
    if(!password){
      error_messages.password = this.props.t("This field is required");
      valid_form = false;
    }
    else if(invalid_messages.password){
      valid_form = false;
    }
    else if(password !== password_confirmation){
      invalid_messages.password_confirmation = this.props.t("Passwords not match");
      valid_form = false;
    }
    else{
      data.password = password;
    }
    if(!username){
      error_messages.username = this.props.t("This field is required");
      valid_form = false;
    }
    else if(invalid_messages.username){
      valid_form = false;
    }
    else{
      data.username = username;
    }
    if(valid_form){
      register(data).then(res => {
        new_state = this.getClearedFormState();
        new_state.network_error = null;
        if(res.success){
          new_state.registration_messages = res.messages;
          this.props.changeDefaultSignInUpView("sign_in");
        }
        this.setState(new_state);
      })
      .catch(err => {
        new_state.network_error = this.props.t("Network error!");
        this.setState(new_state);
        console.log(err);
      });
    }
    else{
      new_state.error_messages = error_messages;
      new_state.invalid_messages = invalid_messages;
      this.setState(new_state);
    }
  }

  handleConnexion = () => {
    const {email_or_username, error_messages, password_sign_in} = this.state;
    var valid_form = true;
    var new_state = {
      network_error: undefined,
    };
    var data = {
    };
    if(!email_or_username){
      error_messages.email_or_username = this.props.t("This field is required.");
      valid_form = false;
    }
    else{
      data.email_or_username = email_or_username;
    }
    if(!password_sign_in){
      error_messages.password_sign_in = this.props.t("This field is required.");
      valid_form = false;
    }
    else{
      data.password = password_sign_in;
    }
    if(valid_form){

      this.props.login_action({user: {username: "xxxxx"}});
    }
    else{
      new_state.error_messages = error_messages;
      this.setState(new_state);
    }
  }

  handleOAuthSuccess = res => {
    if(res.credential)
    console.log("success, res: ", jwt_decode(res.credential))
  }

  handleOAuthFailure = res => {
    console.log("failure, res: ", res)
  }

  render() {
    var pat = /^http?:\/\//i;
    const {address, birthday, country_code, current_language, default_view, email, email_or_username, error_messages, first_name,
      gender, invalid_messages, is_valid_phone_number, last_name, network_error, password, password_confirmation, password_sign_in,
      phone_number, registration_label, registration_messages, username, valid_messages} = this.state;
    var is_sign_up = default_view === "sign_up";
    var direction_class = current_language === "ar" ? "rtl" : "ltr";
    return (
      <>
        <Modal
          show={this.props.show} 
          onHide={() => this.props.onHide()}
          className={`custom_modal sign_in_up_modal ${direction_class}`}
          animation={false}
        >
          <SignInUpModalStyle className="custom_scroll_bar">
            <Modal.Header>
              <span className="visibility_hidden"></span>
              { this.props.t(default_view === "sign_in" ? 'Sign in' : 'Sign up') }
              <Button variant="circle" data-testid="close_btn_sium" className={`close-modal ${direction_class}`} onClick={() => this.props.onHide()}>
                  <span className="close_ico">×</span>
              </Button>
            </Modal.Header>
            <Modal.Body data-testid="body">
              <Row>
                <OAuthButtonContainer added_class={"google_oauth_button"} id={"googleSignInUpButton"} 
                  current_language={current_language} test_id="google_oauth_button_test_id"
                  buttonText={is_sign_up ? "signup_with" : "signin_with"}
                  onSuccess={(res) => this.handleOAuthSuccess(res)}
                  onFailure={(res) => this.handleOAuthFailure(res)}
                  oauth_type="google"
                />
                {is_sign_up ?
                <>
                  <CustomInput test_id="first_name_test_id" added_class="col-12 col-md-6" label={this.props.t("First name")} placeholder={this.props.t("First name")} 
                    value={first_name} invalid_message={invalid_messages.first_name} valid_message={valid_messages.first_name}
                    error_message={error_messages.first_name} on_change={(val) => this.handleFieldChange(val, "first_name")}/>
                  <CustomInput test_id="last_name_test_id" added_class="col-12 col-md-6" label={this.props.t("Last name")} placeholder={this.props.t("Last name")} 
                    value={last_name} invalid_message={invalid_messages.last_name} valid_message={valid_messages.last_name}
                    error_message={error_messages.last_name} on_change={(val) => this.handleFieldChange(val, "last_name")}/>
                  <CustomInput test_id="email_test_id" added_class="col-12 col-md-6" label={this.props.t("Email")} placeholder={this.props.t("Email")} 
                    value={email} invalid_message={invalid_messages.email} valid_message={valid_messages.email}
                    error_message={error_messages.email} on_change={(val) => this.handleFieldChange(val, "email")}/>
                  <CustomInput test_id="username_test_id" added_class="col-12 col-md-6" label={this.props.t("Username")} placeholder={this.props.t("Username")} 
                    value={username} invalid_message={invalid_messages.username} valid_message={valid_messages.username}
                    error_message={error_messages.username} on_change={(val) => this.handleFieldChange(val, "username")}/>
                  <CustomPassword test_id="password_test_id" added_class="col-12 col-md-6" label={this.props.t("Password")} placeholder={this.props.t("Password")} 
                    value={password} invalid_message={invalid_messages.password} valid_message={valid_messages.password} show_trength_bar={true}
                    error_message={error_messages.password} on_change={(val) => this.handleFieldChange(val, "password")}/>
                  <CustomPassword test_id="password_confirmation_test_id" added_class="col-12 col-md-6" label={this.props.t("Confirm password")} placeholder={this.props.t("Confirm password")}  show_trength_bar={true}
                    value={password_confirmation} invalid_message={invalid_messages.password_confirmation} valid_message={valid_messages.password_confirmation}
                    error_message={error_messages.password_confirmation} on_change={(val) => this.handleFieldChange(val, "password_confirmation")}/>
                  <CustomSelect added_class="col-12 col-md-6" label={this.props.t("Country")} countries_options={this.countries_options}
                    placeholder={this.props.t("Choose a country")} value={country_code} current_language={current_language}
                    invalid_message={invalid_messages.country_code} valid_message={valid_messages.country_code} test_id="country_custom_select"
                    error_message={error_messages.country_code} on_change={(val, val2) => this.handleFieldChange(val, "country_code", val2)}/>
                  <CustomPhoneNumber added_class="col-12 col-md-6" label={this.props.t("Phone number")} placeholder={this.props.t("Phone number")} 
                    value={phone_number} invalid_message={invalid_messages.phone_number} valid_message={valid_messages.phone_number} is_valid_phone_number={is_valid_phone_number}
                    error_message={error_messages.phone_number} on_change={(val, is_valid_phone_number_) => this.handleFieldChange(val, "phone_number", is_valid_phone_number_)} default_country={country_code}/>
                  <CustomDate added_class="col-12 col-md-6" label={this.props.t("Date of Birth")} placeholder={this.props.t("Date of Birth")} 
                    value={birthday} invalid_message={invalid_messages.birthday} valid_message={valid_messages.birthday}
                    error_message={error_messages.birthday} on_change={(val) => this.handleFieldChange(val, "birthday")}/>
                  <CustomGender added_class="col-12 col-md-6" label={this.props.t("Gender")} 
                    value={gender} invalid_message={invalid_messages.gender} valid_message={valid_messages.gender}
                    error_message={error_messages.gender} on_change={(val) => this.handleFieldChange(val, "gender")}/>
                  <CustomTextarea added_class="col-12 col-md-12 no_resize" label={this.props.t("Address")} placeholder={this.props.t("Address")} 
                    value={address} invalid_message={invalid_messages.address} valid_message={valid_messages.address} rows={2}
                    error_message={error_messages.address} on_change={(val) => this.handleFieldChange(val, "address")}/>
                  <CustomTSNotice added_class="col-12 col-md-12" registration_label={registration_label}/>
                  {network_error &&
                    <FieldError error_message={network_error} />
                  }
                </>
                :
                <>
                <CustomInput test_id="email_or_username_test_id" added_class="col-12 col-md-6" label={this.props.t("Username or email")} placeholder={this.props.t("Username or email")} 
                  value={email_or_username} invalid_message={invalid_messages.email_or_username} valid_message={valid_messages.email_or_username}
                  error_message={error_messages.email_or_username} on_change={(val) => this.handleFieldChange(val, "email_or_username")}/>
                <CustomPassword test_id="password_test_id" added_class="col-12 col-md-6" label={this.props.t("Password")} placeholder={this.props.t("Password")} 
                  value={password_sign_in} invalid_message={invalid_messages.password_sign_in} valid_message={valid_messages.password_sign_in} show_trength_bar={false}
                  error_message={error_messages.password_sign_in} on_change={(val) => this.handleFieldChange(val, "password_sign_in")}/>
                </>
                }
              </Row>
            </Modal.Body>
            <Modal.Footer>
              {is_sign_up ?
                <>
                  <CustomButton test_id={"sign_up_btn_test_id"}
                    added_class="default-bg-color btn-rounded" text={registration_label}
                    on_click={() => {
                      this.handleRegistration();
                    }}
                    style={{color: "white", }}
                  />
                  <QuestionButton text={this.props.t("Already have an account? Log in here.")}
                    test_id={"sign_in_question_btn_test_id"}
                    on_click={evt => {
                      this.props.changeDefaultSignInUpView("sign_in");
                    }}
                  />
                </>
                :
                <>
                  <CustomButton  test_id={"sign_in_btn_test_id"}
                    added_class="default-bg-color btn-rounded" text={this.props.t("Sign in")}
                    on_click={() => {
                      this.handleConnexion();
                    }}
                    style={{color: "white", }}
                  />
                  <QuestionButton text={this.props.t("You don't have an account yet? Register here.")}
                    test_id={"sign_up_question_btn_test_id"}
                    on_click={evt => {
                      this.props.changeDefaultSignInUpView("sign_up");
                    }}
                  />
                </>
              }
            </Modal.Footer>
          </SignInUpModalStyle>
        </Modal>
        {registration_messages && 
          <SignInUpConfirmationModal
            onHide={() => this.setState({registration_messages: null})}
            registration_messages={registration_messages}
            show={!!registration_messages}
          />
        }
      </>
    );
  }
}
const SignInUpModalStyle = styled.div`
  height: 100%;
  padding: 10px 25px;
  .modal-header{
    position: absolute;
    margin: auto;
    margin-top: -52px;
    left: 0;
    width: 100%;
  }
  .modal-body{
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: calc(100% - 130px);
    padding: 10px 0;
  }
`;
function mapDispatchToProps(dispatch) {
  return {
    login_action: data => dispatch(login_action(data))
  };
}
// export default connect(null, mapDispatchToProps)(withTranslation('translations')(SignInUpModal));
export default withTranslation('translations')(SignInUpModal);
