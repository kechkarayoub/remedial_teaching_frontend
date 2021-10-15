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
import HKPhoneNumber from "../../../components/forms_fields/HKPhoneNumber";
import HKSelect from "../../../components/forms_fields/HKSelect";
import HKTextarea from "../../../components/forms_fields/HKTextarea";

class TermsOfService extends Component {
  constructor(props) {
    super(props);
    this.state= {
      current_language: get("current_language"),
    };
  }

  componentDidMount(){
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
    // if(prevState.current_language !== this.state.current_language){
    // }
    if(Object.keys(new_state).length !== 0){
      this.setState(new_state);
    }
  }

//   componentDidMount(){
//     $('.selectpicker').selectpicker();
//   }

//   componentDidUpdate() {
//     $('.selectpicker').selectpicker("refresh");
//   }


  render() {
    const {current_language, default_view} = this.state;
    return (
      <>
      <Modal
        show={this.props.show} 
        onHide={() => this.props.onHide()}
        className={`custom_modal terms_of_service ${current_language == "ar" ? "rtl" : ""}`}
        animation={false}
      >
        <TermsOfServiceModal className="custom_scroll_bar">
          <Modal.Header>
            <span className="visibility_hidden"></span>
            { this.props.t('Terms of service') }
            <Button variant="circle" className="close-modal" onClick={() => this.props.onHide()}>
                <span className="close_ico">×</span>
            </Button>
          </Modal.Header>
          <Modal.Body data-testid="body">
            <Row>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            
          </Modal.Footer>
        </TermsOfServiceModal>
      </Modal>
      </>
    );
  }
}
const TermsOfServiceModal = styled.div`
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
export default withTranslation('translations')(TermsOfService);
