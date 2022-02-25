import React, { Component } from "react";
import { withTranslation } from 'react-i18next';
import styled from "styled-components";
import FieldError from "./FieldError";
import {get_terms_service_notice} from "../terms_of_service/terms_of_service";
import { get } from "../../services/storage";
import { colors } from "../../assets/variables/colors";
import TermsOfServiceModal from "../terms_of_service/TermsOfServiceModal";
import CookiesPolicyModal from "../terms_of_service/CookiesPolicyModal";
import DataUsePolicyModal from "../terms_of_service/DataUsePolicyModal";

 class CustomTSNotice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      added_class: props.added_class,
      current_language: get("current_language"),
      open_cookie_policy: false,
      open_data_use_policy: false,
      open_terms_of_service: false,
      registration_label: props.registration_label,
    };
  }

  static getDerivedStateFromProps(props, state) {
    var current_language = get("current_language");
    if(current_language !== state.current_language){
      var new_state = {
        added_class: props.added_class,
        current_language: current_language,
        registration_label: props.registration_label,
      };
      return new_state;
    }
    return null;
  }

  handleTermsOfServiceNoticeClicked = (evt) => {
    evt.stopPropagation();
    let el = evt.target;
    if(el && el.classList.contains("term_of_service_span")){
      this.setState({open_terms_of_service: true});
    }
    else if(el && el.classList.contains("data_use_policy_span")){
      this.setState({open_data_use_policy: true});
    }
    else if(el && el.classList.contains("cookie_policy_span")){
      this.setState({open_cookie_policy: true});
    }
  }

  render() {
    const {added_class, current_language, open_cookie_policy, open_data_use_policy, open_terms_of_service, registration_label} = this.state;
    var terms_service_notice = get_terms_service_notice({registration_label: registration_label})
    return (<>
      <CustomTSNoticeStyle className={`terms_service_notice ${added_class || ""}`}>
        <div className="notice" dangerouslySetInnerHTML={{
        __html: terms_service_notice[current_language]
      }} onClick={this.handleTermsOfServiceNoticeClicked}></div>
      </CustomTSNoticeStyle>

      {open_cookie_policy &&
        <CookiesPolicyModal show={open_cookie_policy} onHide={() => this.setState({open_cookie_policy: false})}/>
      }
      {open_data_use_policy &&
        <DataUsePolicyModal show={open_data_use_policy} onHide={() => this.setState({open_data_use_policy: false})}/>
      }
      {open_terms_of_service &&
        <TermsOfServiceModal show={open_terms_of_service} onHide={() => this.setState({open_terms_of_service: false})}/>
      }
    </>);
  }
}

const CustomTSNoticeStyle = styled.div`
  border-radius: 6.3px;
  padding: 13px 15px;
  overflow: hidden;
  .notice{
    color: #777;
    font-size: 12px;
    span{
      &.span_link{
        color: ${colors.default_color};
        cursor: pointer;
        &:hover{
          text-decoration: underline;
        }
      }
    }
  }
  @media screen and (max-width: 1199px){
  }
  @media screen and (max-width: 767px){
  }
`;
export default withTranslation('translations')(CustomTSNotice);


