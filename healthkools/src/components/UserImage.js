import PropTypes from 'prop-types';
import React, {Component} from "react";
import styles from "styled-components";
import default_user_image from "assets/img/default_user_image.png";
import { withTranslation } from 'react-i18next';
class UserImage extends Component {
  constructor(props){
    super(props);
    this.state = {
      image_url: props.image_url,
    };
  }
  static defaultProps = {
    containerStyle: null,
    image_url: "",
    on_click: null,
    on_remove: null,
    remove_icon_style: null,
    style: null,
    title: "",
    test_id: "user_image_test_id",
    t: val => val,
  };

  static getDerivedStateFromProps(props, state) {
    return {
      image_url: props.image_url,
    };
  }

  render(){
    const {image_url} = this.state;
    return (
      <UserImageStyle className='user_image' style={this.props.containerStyle || {}} data-testid={this.props.test_id} >
        {this.props.on_remove && image_url &&
          <i className="fa fa-times remove_icon" onClick={evt => {
            evt.stopPropagation();
            this.props.on_remove();
          }} style={this.props.remove_icon_style} data-testid="user_image_remove_icon_test_id"/>
        }
        <img src={image_url ? image_url : default_user_image} alt={this.props.t(image_url ? this.props.title : "Default image")} style={this.props.style || {}} 
          onClick={evt => {
            if(this.props.on_click){
                this.props.on_click(evt);
            }
          }}
        />
      </UserImageStyle>
    );
  }
};
const UserImageStyle = styles.div`
  height: 130px;
  margin: auto;
  padding: 10px;
  position: relative;
  width: 130px;
  img{
    border-radius: 50%;
    height: 100%;
    width: 100%;
  }
  .remove_icon{
    color: red;
    cursor: pointer;
    position: absolute;
    right: 10px;
    top: 10px;
  }
`;

UserImage.propTypes = {
  containerStyle: PropTypes.string,
  image_url: PropTypes.string,
  on_click: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.object,
  ]),
  on_remove: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.object,
  ]),
  remove_icon_style: PropTypes.object,
  style: PropTypes.object,
  title: PropTypes.string,
  test_id: PropTypes.string,
  t: PropTypes.func,
};
export default withTranslation('translations')(UserImage);
