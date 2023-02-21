import PropTypes from 'prop-types';
import React, {Component} from "react";
import styles from "styled-components";
import default_user_image from "assets/img/default_user_image.png";
import { withTranslation } from 'react-i18next';
class UserDefaultImage extends Component {
  constructor(props){
    super(props);
  }
  static defaultProps = {
    containerStyle: null,
    on_click: null,
    style: null,
    t: val => val,
  };
  render(){
    return (
      <UserDefaultImageStyle style={this.props.containerStyle || {}} >
        <img src={default_user_image} alt={this.props.t("Default image")} style={this.props.style || {}} 
          onClick={evt => {
            if(this.props.on_click){
                this.props.on_click(evt);
            }
          }}
        />
      </UserDefaultImageStyle>
    );
  }
};
const UserDefaultImageStyle = styles.div`
  height: 130px;
  margin: auto;
  padding: 10px;
  width: 130px;
  img{
    height: 100%;
    width: 100%;
  }
`;

UserDefaultImage.propTypes = {
  containerStyle: PropTypes.string,
  on_click: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.object,
  ]),
  style: PropTypes.object,
  t: PropTypes.func,
};
export default withTranslation('translations')(UserDefaultImage);
