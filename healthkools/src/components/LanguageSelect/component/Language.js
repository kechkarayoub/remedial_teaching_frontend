import React, { Component } from "react";
import styled from "styled-components";
import {colors} from "../../../assets/variables/colors";
import { withTranslation } from 'react-i18next';
class Language extends Component {
    constructor(props) {
        super(props);
        this.state = {
            language: props.language,
            selected_language: props.selected_language,
        };
    }
    static getDerivedStateFromProps(props, state) {
        if(props.selected_language != state.selected_language){
          var new_state = {selected_language: props.selected_language};
          return new_state;
        }
        return null;
    }
    render(){
        const {language, selected_language} = this.state;
        return(
            <LanguageStyle className={`${selected_language === "ar" ? "rtl" : "ltr"}`}  key={language.value} 
                onClick={(evt) => this.props.handleSelectLanguage(evt, language.value)} role="language"
            >
                <img src={language.flag} alt={this.props.t(language.alt)} />{this.props.t(language.short_name)}
            </LanguageStyle>
        )
    }
}
const LanguageStyle = styled.li`
    border-bottom: 1px solid gray;
    color: black;
    cursor: pointer;
    display: flex;
    margin-bottom: 5px;
    &:hover{
        color: ${colors.default_color};
    }
    &:last-child{
        border-bottom: 0;
        margin-bottom: 0;
    }
    img{
        height: 12px;
        margin: 0 5px;
        margin-top: 5px;
        max-height: 12px;
        width: 16px;
    }
`;
export default withTranslation('translations')(Language);