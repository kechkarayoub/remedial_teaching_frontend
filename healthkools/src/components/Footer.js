import React, {Component} from "react";
import styles from "styled-components";
import LogoImage from "./LogoImage";
import { withTranslation } from 'react-i18next';
import { images } from "./_resources";
import { colors } from "../assets/variables/colors";
import { get } from "../services/storage";
import moment from "moment"
// import { Link } from "react-router-dom";
class Footer extends Component {
  constructor(props){
    super(props);
    this.current_language = get("current_language") || "en";
  }
  render(){
    return (
      <>
        <FooterStyle>
          <div className="footer-logo">
            <LogoImage style={{
                cursor: "pointer",
                marginBottom: "20px",
                marginLeft: "auto",
                marginRight: "auto",
                maxWidth: "250px",
                minWidth: "200px",
              }}
              on_click={() => {
                this.props.history.push(`/`);
              }} 
            />
          </div>
          <div className="container">
            <div className="contact_mail">
              <h3 className={this.current_language == "ar" ? "rtl" : "ltr"}>{ this.props.t("Contact us") }{": "}<a href="mailto:hello@healthkools.com">hello@healthkools.com</a></h3>
            </div>
          </div>
        </FooterStyle>
        <Copyright className="copyright">
          <p>{moment().format("YYYY") + " © Healthkools"}</p>
        </Copyright>
      </>
    );
  }
};
const Copyright = styles.div`
  background: ${colors.default_color};
  float: left;
  padding: 10px;
  text-align: center;
  width:100%;
  p{
    color: white;
    font-family: 'Montserrat', sans-serif;
    font-size: 10.5px;
    font-stretch: normal;
    font-style: normal;
    font-weight: bold;
    letter-spacing: normal;
    line-height: 2;
    margin: 0;
    text-align: center;
  }
`;
const FooterStyle = styles.footer`
  background: #f7f7f7;
  border-top: 10px solid ${colors.white};
  box-shadow: 0 -2px 10px 0 rgba(0,0,0,0.15);
  float: left;
  padding-bottom: 30px;
  width: 100%;
  .footer-logo{
    margin-bottom: 30px;
    text-align: center;
  }
  .contact_mail{
    float: right;
    text-align: center;
    width: 100%;
    margin-top: -15px;
    h3{
      color: #292929;
      font-family: 'Montserrat', sans-serif;
      font-size: 14px;
      font-style: normal;
      font-stretch: normal;
      font-weight: bold;
      line-height: normal;
      letter-spacing: 2.4px;
      margin-bottom: -20px;
      opacity: 0.63;
    }
  }
  @media(max-width: 1199px){
    
  }  

  @media(max-width: 767px){
    overflow-x: inherit;
  }
`;

export default withTranslation('translations')(Footer);
