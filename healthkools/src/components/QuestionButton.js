import React, { Component } from "react";
import styled from "styled-components";
import {colors} from "../assets/variables/colors";
import { withTranslation } from 'react-i18next';

class QuestionButton extends Component {
    render(){
        var test_id = this.props.test_id || "question_button";
        return(
            <QuestionButtonStyle 
                className={`${this.props.added_class || ""}`} onClick={this.props.on_click}
                style={this.props.style || {}} data-testid={test_id}
            >
                {this.props.t(this.props.text)}
            </QuestionButtonStyle>
        )
    }
}
const QuestionButtonStyle = styled.span`
    color: #a9a9a9;
    cursor: pointer;
    display: block;
    font-size: 14px;
    text-align: center;
    text-decoration: underline;
    width: 100%;
`;
export default withTranslation('translations')(QuestionButton);