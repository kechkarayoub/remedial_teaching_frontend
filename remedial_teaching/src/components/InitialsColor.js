import PropTypes from 'prop-types';
import React, {Component} from "react";
import styles from "styled-components";
import { withTranslation } from 'react-i18next';

class InitialsColor extends Component {
  constructor(props){
    super(props);
  }

  static defaultProps = {
    added_className: "",
    bg_color: "gray",
    containerStyle: null,
    initials: "",
    on_click: null,
    style: null,
    t: val => val,
    title: "",
    test_id: "initials_color_test_id",
  };

  render(){
    var style = this.props.style || {};
    style.backgroundColor = this.props.bg_color;
    if(this.props.on_click){
      style.cursor = "pointer";
    }
    return (
      <InitialsColorStyle className={"initials_bg_color_container " + this.props.added_className} style={this.props.containerStyle || {}} >
        <div
          className="initials_content"
          style={style}
          title={this.props.title}
          data-testid={this.props.test_id}
          onClick={evt => {
            if(this.props.on_click){
                this.props.on_click(evt);
            }
          }}
        >
          {this.props.initials}
        </div>
      </InitialsColorStyle>
    );
  }
};

const InitialsColorStyle = styles.div`
  height: 130px;
  margin: auto;
  padding: 10px;
  width: 130px;
  .initials_content{
    border-radius: 50%;
    color: white;
    font-size: 3em;
    font-weight: bold;
    height: 110px;
    line-height: 110px;
    margin: auto;
    text-align: center;
    text-transform: uppercase;
    vertical-align: middle;
    width: 110px;
  }
`;

InitialsColor.propTypes = {
  added_className: PropTypes.string,
  bg_color: PropTypes.string,
  containerStyle: PropTypes.object,
  initials: PropTypes.string,
  on_click: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.object,
  ]),
  style: PropTypes.object,
  title: PropTypes.string,
  test_id: PropTypes.string,
  t: PropTypes.func,
};

export default withTranslation('translations')(InitialsColor);
