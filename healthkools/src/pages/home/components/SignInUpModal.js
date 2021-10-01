import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import styled from "styled-components";

import DatePicker from "react-datepicker";
import $ from 'jquery';
import { withTranslation, Trans } from 'react-i18next';
import moment from 'moment';
import { get } from "../../../services/storage";

class SignInUpModal extends Component {
  constructor(props) {
    super(props);
    this.state= {
      current_language: get("current_language") || "en",
      default_view: props.default_sign_in_up_view,
      isSubmitting: false,
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
    const {current_language, default_view} = this.state;
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
            { this.props.t(default_view == "sign_in" ? 'Sign in' : 'Sign up') }
            <Button variant="circle" className="btn-close-modal" onClick={() => this.props.onHide()}>
                <span className="close_ico">×</span>
            </Button>
          </Modal.Header>
          <Modal.Body>
            
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
`;
export default withTranslation('translations')(SignInUpModal);
