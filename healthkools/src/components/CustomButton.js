import React, { Component } from "react";
import styled from "styled-components";
import {colors} from "../assets/variables/colors";
import { withTranslation } from 'react-i18next';

class CustomButton extends Component {
    // constructor(props) {
    //     super(props);
    // }
    render(){
        var test_id = this.props.test_id || ("custom_button_" + parseInt(Math.random() * 100));
        return(
            <CustomButtonStyle data-testid={test_id}
                className={`btn ${this.props.added_class || ""}`} type='button' onClick={this.props.on_click}
                style={this.props.style || {}}
            >
                {this.props.t(this.props.text)}
            </CustomButtonStyle>
        )
    }
}
const CustomButtonStyle = styled.button`
    &.btn{
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
export default withTranslation('translations')(CustomButton);