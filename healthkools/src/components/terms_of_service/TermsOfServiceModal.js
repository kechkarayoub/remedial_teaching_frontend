import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import styled from "styled-components";

import { withTranslation, Trans, composeInitialProps } from 'react-i18next';
import moment from 'moment';
import { get } from "../../services/storage";
import { colors } from "../../assets/variables/colors";
import { get_articles } from "./terms_of_service";
import { get_data } from "./data";
import HKButton from "../HKButton";

class TermsOfServiceModal extends Component {
  constructor(props) {
    super(props);
    this.data = get_data();
    this.state= {
      articles: get_articles(this.data),
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
    const {current_language, articles} = this.state;
    return (
      <>
      <Modal
        show={this.props.show} 
        onHide={() => this.props.onHide()}
        className={`custom_modal terms_of_service ${current_language === "ar" ? "rtl" : ""}`}
        backdropClassName='backdrop_custom_z_index_1055'
        animation={false}
      >
        <TermsOfServiceModalStyle className="custom_scroll_bar">
          <Modal.Header>
            <span className="visibility_hidden"></span>
            { this.props.t('Terms of service') }
            <Button variant="circle" className="close-modal" onClick={() => this.props.onHide()}>
                <span className="close_ico">×</span>
            </Button>
          </Modal.Header>
          <Modal.Body data-testid="body">
            <Row>
              {articles.map((article, idx) => {
                return <div className={`article `}>
                  <p key={idx} className={`title `}>
                    <span className="article_number">{this.props.t("Item") + " " + (idx + 1) + ": "}</span>
                    <span>{article.title[current_language]}</span>
                  </p>
                  {article.paragraphs.map((paragraph, idx_p) => {
                    return <>
                      <p key={idx + "_" + idx_p} className={` `} dangerouslySetInnerHTML={{
                        __html: paragraph[current_language]
                      }}></p>
                      {paragraph.list_items &&
                        <ul>
                          {paragraph.list_items.map((li, idx) => {
                            return <li key={idx} dangerouslySetInnerHTML={{__html: li[current_language]}}></li>
                          })}
                        </ul>
                      }
                    </>
                  })}
                </div>
              })}
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <HKButton
              added_class="default-bg-color btn-rounded" text={"Close"}
              on_click={() => {
                this.props.onHide();
              }}
              style={{color: "white", }}
            />
          </Modal.Footer>
        </TermsOfServiceModalStyle>
      </Modal>
      </>
    );
  }
}
const TermsOfServiceModalStyle = styled.div`
  height: 100%;
  padding: 10px 25px 10px 15px;
  .modal-header{
    color: #1fa1cf;
    font-size: 20px;
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
    padding: 10px 20px;
    .article{
      margin-bottom: 15px;
      p{
        text-align: justify;
        &.title{
          color: ${colors.default_color};
          font-size: 20px;
          font-weight: bold;
        }
      }
    }
  }
`;
export default withTranslation('translations')(TermsOfServiceModal);