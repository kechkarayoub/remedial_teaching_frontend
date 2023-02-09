import React, { Component } from "react";
import styled from "styled-components";
import {colors} from "assets/variables/colors";
import { withTranslation } from 'react-i18next';

class TextDiv extends Component {
    render(){
        return(
            <TextDivStyle 
                className={`${this.props.added_class || ""}`} onClick={this.props.on_click}
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
export default withTranslation('translations')(TextDiv);