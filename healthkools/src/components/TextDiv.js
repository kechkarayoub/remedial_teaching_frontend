import PropTypes from 'prop-types';
import React, { Component } from "react";
import styled from "styled-components";
import {colors} from "assets/variables/colors";
import { withTranslation } from 'react-i18next';

class TextDiv extends Component {
    constructor(props){
        super(props);
      }
      static defaultProps = {
        added_class: "",
        on_click: null,
        style: null,
        text: "",
      };
    render(){
        return(
            <TextDivStyle 
                className={`${this.props.added_class || ""}`} onClick={evt => {
                    if(this.props.on_click){
                        this.props.on_click(evt);
                    }
                  }}
                style={this.props.style || {}}
            >
                {this.props.t(this.props.text)}
            </TextDivStyle>
        )
    }
}
const TextDivStyle = styled.div`
    color: black;
    display: block;
    font-size: 14px;
    margin-bottom: 25px;
    text-align: center;
    width: 100%;
`;
TextDiv.propTypes = {
    added_class: PropTypes.string,
    on_click: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.object,
    ]),
    style: PropTypes.object,
    text: PropTypes.string,
  };
export default withTranslation('translations')(TextDiv);