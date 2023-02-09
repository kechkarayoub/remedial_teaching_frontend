import React, {Component} from "react";
import styles from "styled-components";
import LogoImage from "components/LogoImage";
import { withTranslation } from 'react-i18next';
import LanguageSelect from "components/LanguageSelect/index";
import { colors } from "assets/variables/colors";
import { get } from "services/storage";
import {images} from "pages/home/_resources";
import CustomButtonIcon from 'components/CustomButtonIcon';
import SignInUpModal from 'pages/home/components/SignInUpModal';
import moment from "moment"
import { connect } from "react-redux";
// import { Link } from "react-router-dom";
class HomeHeader extends Component {
  constructor(props){
    super(props);
    this.state = {
      current_language: get("current_language"),
      open_sign_in_up: false,
      default_sign_in_up_view: "sign_in",
      user: props.user,
    };
  }

  static getDerivedStateFromProps(props, state) {
    var current_language = get("current_language");
    if(current_language !== state.current_language || state.user !== props.user){
      var new_state = {current_language: current_language};
      return new_state;
    }
    return null;
  }

  render(){
    const {current_language, open_sign_in_up, default_sign_in_up_view} = this.state;
    var direction_class = current_language === "ar" ? "rtl" : "ltr";
    return (
      <>
        <HomeHeaderStyle>
          <div className={`header-top ${direction_class}`}>
            <div className={`left`}>
            </div>
            <div className={`right ${direction_class}`}>
              <LanguageSelect />
              <CustomButtonIcon added_class={"btn_white"} image={images.sign_in} alt={this.props.t("Sign in icon")} on_click={() => {
                this.setState({
                  open_sign_in_up: true,
                  default_sign_in_up_view: "sign_in",
                });
              }} />
              <CustomButtonIcon added_class={"btn_white"} image={images.sign_up} alt={this.props.t("Sign up icon")} on_click={() => {
                this.setState({
                  open_sign_in_up: true,
                  default_sign_in_up_view: "sign_up",
                });
              }} />
            </div>
          </div>
          <div className={`header-bottom ${direction_class}`}>
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
            changeDefaultSignInUpView={view => this.setState({default_sign_in_up_view: view})}
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
    .header-bottom{
      padding: 5px 50px;
      .left{
      }
      .right{
  
      }
    }
    .header-top{
      padding: 5px 50px;
      .left{
      }
      .right{
      }
    }
  }  

  @media(max-width: 767px){
    overflow-x: inherit;
    .header-bottom{
      padding: 5px 15px;
      .left{
      }
      .right{
  
      }
    }
    .header-top{
      padding: 5px 15px;
      .left{
      }
      .right{
      }
    }
  }
`;
const mapStateToProps = state => {
  return { user: state.user };
};
// export default connect(mapStateToProps)(withTranslation('translations')(HomeHeader));
export default withTranslation('translations')(HomeHeader);
