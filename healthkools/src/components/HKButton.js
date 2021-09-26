import React, { Component } from "react";
import styled from "styled-components";
import {colors} from "../assets/variables/colors";
import { withTranslation } from 'react-i18next';

class HKButton extends Component {
    // constructor(props) {
    //     super(props);
    // }
    render(){
        return(
            <HKButtonStyle 
                className={`btnn ${this.props.added_class || ""}`} type='button' onClick={this.props.on_click}
                style={this.props.style || {}}
            >
                {this.props.t(this.props.text)}
            </HKButtonStyle>
        )
    }
}
const HKButtonStyle = styled.button`
    &.btnn{
        border: 0;
        cursor: pointer;
        font-size: 14px;
        font-weight: 600;
        height: 30px;
        margin: auto;
        min-width: 100px;
        padding: 0 10px;
        width: max-content;
        &:focus{
            outline: none;
        }
    }

    &.btn-rounded{
        border-radius: 20px;
    }
    &.default-bg-color{
        background-color: ${colors.default_color};
    }
    &.default-color{
        color: ${colors.default_color};
    }
`;
export default withTranslation('translations')(HKButton);