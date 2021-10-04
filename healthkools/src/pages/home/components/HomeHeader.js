import React, {Component} from "react";
import styles from "styled-components";
import LogoImage from "../../../components/LogoImage";
import { withTranslation } from 'react-i18next';
import LanguageSelect from "../../../components/LanguageSelect/index";
import { colors } from "../../../assets/variables/colors";
import { get } from "../../../services/storage";
import {images} from "../_resources";
import HKButtonIcon from '../../../components/HKButtonIcon';
import SignInUpModal from './SignInUpModal';
import moment from "moment"
// import { Link } from "react-router-dom";
class HomeHeader extends Component {
  constructor(props){
    super(props);
    this.state = {
      current_language: get("current_language") || "fr",
      open_sign_in_up: false,
      default_sign_in_up_view: "sign_in",
    };
  }

  static getDerivedStateFromProps(props, state) {
    var current_language = get("current_language") || "fr";
    if(current_language !== state.current_language){
      var new_state = {current_language: current_language};
      return new_state;
    }
    return null;
  }

  render(){
    const {current_language, open_sign_in_up, default_sign_in_up_view} = this.state;
    return (
      <>
        <HomeHeaderStyle>
          <div className={`header-top ${current_language === "ar" ? "rtl" : ""}`}>
            <div className={`left`}>
            </div>
            <div className={`right ${current_language === "ar" ? "rtl" : ""}`}>
              <LanguageSelect />
              <HKButtonIcon image={images.sign_in} alt={this.props.t("Sign in icon")} on_click={() => {
                this.setState({
                  open_sign_in_up: true,
                  default_sign_in_up_view: "sign_in",
                });
              }} />
              <HKButtonIcon image={images.sign_up} alt={this.props.t("Sign up icon")} on_click={() => {
                this.setState({
                  open_sign_in_up: true,
                  default_sign_in_up_view: "sign_up",
                });
              }} />
            </div>
          </div>
          <div className={`header-bottom ${current_language === "ar" ? "rtl" : ""}`}>
            <div className={`left `}>
              <LogoImage style={{
                  cursor: "pointer",
                  height: "75px",
                  maxWidth: "150px",
                  minWidth: "100px",
                }}
                on_click={() => {
                  this.props.history.push(`/`);
                }} 
              />
            </div>
            <div className={`right `}>

            </div>
          </div>
        </HomeHeaderStyle>
        {open_sign_in_up &&
          <SignInUpModal 
            default_sign_in_up_view={default_sign_in_up_view}
            onHide={() => this.setState({open_sign_in_up: false})}
            show={open_sign_in_up}
          />
        }
      </>
    );
  }
};
const HomeHeaderStyle = styles.header`
  border-bottom: 1px solid #EAEAEA;
  width: 100%;
  .header-bottom{
    display: flex;
    justify-content: space-between;
    padding: 25px 150px;
    .left{
    }
    .right{

    }
  }
  .header-top{
    background: ${colors.default_color};
    display: flex;
    justify-content: space-between;
    padding: 5px 150px;
    .left{
      display: flex;
      justify-content: space-between;
    }
    .right{
      display: flex;
      justify-content: space-between;
    }
  }
  @media(max-width: 1199px){
    
  }  

  @media(max-width: 767px){
    overflow-x: inherit;
  }
`;

export default withTranslation('translations')(HomeHeader);
