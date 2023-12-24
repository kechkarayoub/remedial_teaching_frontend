import PropTypes from 'prop-types';
import React, { Component } from "react";
import styled from "styled-components";
import { get } from "services/storage";
import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { withTranslation } from 'react-i18next';


 class OAuthButtonContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_language: get("current_language"),
    };
  }

  static defaultProps = {
    added_class: "",
    buttonText: "",
    id: "",
    oauth_type: "",
    onFailure: null,
    onSuccess: null,
    show_separator: false,
    t: val => val,
    test_id: "",
  };

  componentDidMount() {
  }

  static getDerivedStateFromProps(props, state) {
    var current_language = get("current_language");
    if(current_language !== state.current_language){
      var new_state = {current_language: current_language};
      return new_state;
    }
    return null;
  }

  get_locale = current_language => {
    if(current_language === "ar"){
      return "ar_AR";
    }
    if(current_language === "fr"){
      return "fr_FR";
    }
    return "en_EN";
  }

  render() {
    const {current_language} = this.state;
    var test_id = this.props.test_id || "custom_oauth_button_container_test_id";
    if(["google"].indexOf(this.props.oauth_type) === -1){
      return <></>
    }
    return (
      <OAuthButtonContainerStyle id={this.props.id} className={`oauth_button ${this.props.added_class || ""}`}
        data-testid={test_id} 
      >
        {this.props.oauth_type === "google" &&
        
          <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}>
            <GoogleLogin
              text={this.props.buttonText}
              onSuccess={this.props.onSuccess}
              onError={this.props.onFailure}
              locale={this.get_locale(current_language)}
            />
          </GoogleOAuthProvider>
        }
        {this.props.show_separator &&
          <div className="separator">
            <span data-testid={"oauth_separator"}>{this.props.t("Or")}</span>
          </div>
        }
      </OAuthButtonContainerStyle>
    );
  }
}

const OAuthButtonContainerStyle = styled.div`
  >div{
    max-width: 250px;
    margin: auto;
    
    iframe{
      margin: auto !important;
    }
  }
  .separator{
    border: 1px solid #dee2e6;
    margin: 15px 0;
    max-width: 100%;
    position: relative;
    width: 100%;
    span{
      background-color: white;
      color: #dee2e6;
      font-weight: bold;
      left: 50%;
      padding: 0 3px;
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
  @media screen and (max-width: 1199px){
  }
  @media screen and (max-width: 767px){
  }
`;

OAuthButtonContainer.propTypes = {
  added_class: PropTypes.string,
  buttonText: PropTypes.string,
  id: PropTypes.string,
  oauth_type: PropTypes.string,
  onFailure: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]),
  onSuccess: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]),
  show_separator: PropTypes.bool,
  t: PropTypes.func,
  test_id: PropTypes.string,
};

export default withTranslation('translations')(OAuthButtonContainer);
