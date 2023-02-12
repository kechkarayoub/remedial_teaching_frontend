import CustomButton from "components/CustomButton";
import FieldError from "components/forms_fields/FieldError";
import FieldValid from "components/forms_fields/FieldValid";
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Component } from "react";
import styled from "styled-components";
import TextDiv from "components/TextDiv";
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import {colors} from "assets/variables/colors";
import { get } from "services/storage";
import { resend_activation_email } from "services/api";
import { withTranslation, Trans, composeInitialProps } from 'react-i18next';


class SignInUpConfirmationModal extends Component {
  constructor(props) {
    super(props);
    this.state= {
      current_language: get("current_language"),
      network_error: undefined,
      registration_messages: props.registration_messages,
    };
  }
  static defaultProps = {
    onHide: () => {},
    registration_messages: {},
    show: true,
    t: val => val,
  };

  handleResentEmailActivation = () => {
    const {registration_messages, current_language} = this.state;
    var new_state = {
      invalid_message: undefined,
      network_error: undefined,
      valid_message: undefined,
      valid_message2: undefined,
    };
    var data = {
      current_language: current_language,
      username: registration_messages.username,
    };
    resend_activation_email(data).then(res => {
      new_state.network_error = null;
      if(res.success){
        new_state.valid_message = res.message || res.message1;
      }
      else{
        if(res.message2){
          new_state.valid_message = res.message1;
          new_state.valid_message2 = res.message2;
        }
        else{
          new_state.invalid_message = res.message;
        }
      }
      this.setState(new_state);
    })
    .catch(err => {
      new_state.network_error = this.props.t("Network error!");
      this.setState(new_state);
      console.log(err);
    });
  }

  render() {
    const {current_language, invalid_message, network_error, registration_messages, valid_message, valid_message2} = this.state;
    var direction_class = current_language === "ar" ? "rtl" : "ltr";
    return (
      <>
        <Modal
          show={this.props.show} 
          onHide={() => this.props.onHide()}
          className={`custom_modal sign_in_up_modal ${direction_class}`}
          animation={false}
        >
          <SignInUpConfirmationModalStyle className="custom_scroll_bar">
            <Modal.Header>
              <span className="visibility_hidden"></span>
              { this.props.t('Your account is created') }
              <Button variant="circle" data-testid="close_btn_siucm" className={`close-modal ${direction_class}`} onClick={() => this.props.onHide()}>
                  <span className="close_ico">×</span>
              </Button>
            </Modal.Header>
            <Modal.Body data-testid="body">
              <TextDiv text={registration_messages.title}/>
              <TextDiv text={registration_messages.p1}/>
              <TextDiv text={registration_messages.p2} on_click={this.handleResentEmailActivation}
                style={{color: colors.default_color, cursor: "pointer",}}
              />
              <Row>
                {(invalid_message) &&
                    <FieldError error_message={invalid_message} />
                }
                {valid_message &&
                    <FieldValid valid_message={valid_message} />
                }
                {valid_message2 &&
                    <FieldValid valid_message={valid_message2} />
                }
                {network_error &&
                  <FieldError error_message={network_error} />
                }
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <CustomButton
                added_class="default-bg-color btn-rounded" text={this.props.t("Sign in")}
                on_click={() => {
                  this.props.onHide();
                }}
                style={{color: "white", }}
              />
            </Modal.Footer>
          </SignInUpConfirmationModalStyle>
        </Modal>
      </>
    );
  }
}
const SignInUpConfirmationModalStyle = styled.div`
  height: 100%;
  padding: 10px 25px;
  .modal-header{
    color: #1fa1cf;
    font-weight: bold;
    padding: 5px 0;
    padding-bottom: 20px;
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: calc(100% - 115px);
    padding: 10px 0;
  }
`;
SignInUpConfirmationModal.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.object,
  ]),
  registration_messages: PropTypes.object,
  t: PropTypes.func,
};
export default withTranslation('translations')(SignInUpConfirmationModal);
