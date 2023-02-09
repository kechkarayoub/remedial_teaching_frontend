import React, { Component } from "react";
import { withTranslation } from 'react-i18next';
import styled from "styled-components";
import { colors } from "../../../assets/variables/colors";
import { GoogleLogin } from '@react-oauth/google';
import { get } from "../../../services/storage";
import { GoogleOAuthProvider } from '@react-oauth/google';


 class OAuthButtonContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_language: get("current_language"),
    };
  }

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
  @media screen and (max-width: 1199px){
  }
  @media screen and (max-width: 767px){
  }
`;
export default withTranslation('translations')(OAuthButtonContainer);


