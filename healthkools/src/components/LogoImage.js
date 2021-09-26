import React, {Component} from "react";
import styles from "styled-components";
import logo from "../assets/img/logo_temp.jpg";
import { withTranslation } from 'react-i18next';
class LogoImage extends Component {
  // constructor(props){
  //   super(props);
  // }
  render(){
    return (
      <LogoImageStyle src={this.props.image || logo} alt={this.props.t("Logo image")} style={this.props.style || {}} 
        onClick={this.props.on_click}
      />
    );
  }
};
const LogoImageStyle = styles.img`
`;

export default withTranslation('translations')(LogoImage);
