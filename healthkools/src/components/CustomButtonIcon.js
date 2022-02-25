import React, { Component } from "react";
import styled from "styled-components";
import { withTranslation } from 'react-i18next';

class CustomButtonIcon extends Component {
    render(){
        return(
            <CustomButtonIconStyle 
                className={`btnn ${this.props.added_class || ""}`} type='button' onClick={this.props.on_click}
                style={this.props.style || {}}
            >
                <img src={this.props.image} alt={this.props.alt} />
            </CustomButtonIconStyle>
        )
    }
}
const CustomButtonIconStyle = styled.button`
    border: 0;
    border-radius: 50%;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    height: 30px;
    margin: 0 5px;
    min-width: max-content;
    padding: 1px;
    width: max-content;
    &:focus{
        outline: none;
    }
    img{
        width: 28px;
        height: 28px;
    }
`;
export default withTranslation('translations')(CustomButtonIcon);