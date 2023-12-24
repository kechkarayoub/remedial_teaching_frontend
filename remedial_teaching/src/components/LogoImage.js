import PropTypes from 'prop-types';
import React, {Component} from "react";
import styles from "styled-components";
import logo from "assets/img/logo_temp.jpg";
import { withTranslation } from 'react-i18next';

class LogoImage extends Component {
  constructor(props){
    super(props);
  }

  static defaultProps = {
    image: null,
    on_click: null,
    style: null,
    t: val => val,
  };

  render(){
    return (
      <LogoImageStyle src={this.props.image || logo} alt={this.props.t("Logo image")} style={this.props.style || {}} 
        onClick={evt => {
          if(this.props.on_click){
              this.props.on_click(evt);
          }
        }}
      />
    );
  }
};

const LogoImageStyle = styles.img`
`;

LogoImage.propTypes = {
  image: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ]),
  on_click: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.object,
  ]),
  style: PropTypes.object,
  t: PropTypes.func,
};

export default withTranslation('translations')(LogoImage);
