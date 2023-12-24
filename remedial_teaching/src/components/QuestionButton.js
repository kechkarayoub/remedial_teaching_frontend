import PropTypes from 'prop-types';
import React, { Component } from "react";
import styled from "styled-components";
import { withTranslation } from 'react-i18next';

class QuestionButton extends Component {
    constructor(props){
      super(props);
    }

    static defaultProps = {
      added_class: "",
      on_click: null,
      style: null,
      test_id: "",
      t: val => val,
    };

    render(){
        var test_id = this.props.test_id || "question_button";
        return(
            <QuestionButtonStyle 
                className={`${this.props.added_class || ""}`} onClick={evt => {
                    if(this.props.on_click){
                        this.props.on_click(evt);
                    }
                }}
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

QuestionButton.propTypes = {
  added_class: PropTypes.string,
  on_click: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.object,
  ]),
  style: PropTypes.object,
  test_id: PropTypes.string,
  t: PropTypes.func,
};

export default withTranslation('translations')(QuestionButton);
