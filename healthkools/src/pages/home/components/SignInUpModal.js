import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import styled from "styled-components";

import DatePicker from "react-datepicker";
import $ from 'jquery';
import { withTranslation, Trans, composeInitialProps } from 'react-i18next';
import { get_geo_info } from '../../../services/api';
import { get_contries_select_options } from '../../../utils/countries_list';
import moment from 'moment';
import { get } from "../../../services/storage";
import InputText from "../../../components/forms_fields/InputText";
import InputSelect from "../../../components/forms_fields/InputSelect";

class SignInUpModal extends Component {
  constructor(props) {
    super(props);
    this.state= {
      address: "",
      birthday: moment().add(-30, "years").toDate(),
      country_code: "",
      current_language: get("current_language"),
      default_view: props.default_sign_in_up_view,
      email: "",
      first_name: "",
      gender: "",
      is_submitting: false,
      last_name: "",
      phone_number: "",
      username: "",
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
      this.countries_options = get_contries_select_options(this.state.current_language, this.props.t);
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

  handleChangeImageSource = (evt) =>{
    this.setState({
      type_img: evt.target.value
    });
  }

  handleBrowseImage = (evt, setFieldValue) => {
    setFieldValue('img', evt.target.files[0]);
    setFieldValue('is_browsed', true);
  }

  handleBrowseFile = (evt, setFieldValue) => {
    this.ref_file_label.current.value = evt.target.files[0].name;
    setFieldValue('file', evt.target.files[0]);
  }

  handleSubmit = form => {
    let data = new FormData();
    if(this.state.type_img == "new" && (!this.props.book || this.props.book.image_src!=form.img))
      data.set('img_file', form.img);
    else if(this.state.type_img == "exist")
      data.set('img_src', form.img);
    data.set('author_name', form.author_name);
    data.set('edition_date', form.edition_date ? moment(form.edition_date).format("YYYY-MM-DD") : "");
    data.set('editor_name', form.editor_name);
    data.set('isbn', form.isbn);
    data.set('langue', form.langue);
    data.set('nbr_copies', form.nbr_copies);
    data.set('name', form.name);
    if(this.props.book){
      data.set('book_id', this.props.book.id);
      data.set('action', 'update_book');
    }
    else
      data.set('action', 'create_book');

    data.set('school_id', this.props.school_id);
    

  }

//   componentDidMount(){
//     $('.selectpicker').selectpicker();
//   }

//   componentDidUpdate() {
//     $('.selectpicker').selectpicker("refresh");
//   }


  render() {
    var pat = /^http?:\/\//i;
    const {current_language, default_view, country_code} = this.state;
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
            <InputText label="ffff" value={country_code} invalid_message={"error_message"} valid_message={"valid_message"} />
            <InputSelect label="country" placeholder={this.props.t("Choose a country")} value={country_code} countries_options={this.countries_options}
              invalid_message={"error_message"} valid_message={"valid_message"} current_language={current_language}/>
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
`;
export default withTranslation('translations')(SignInUpModal);
