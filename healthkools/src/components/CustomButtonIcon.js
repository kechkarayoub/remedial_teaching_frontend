import PropTypes from 'prop-types';
import React, { Component } from "react";
import styled from "styled-components";
import { withTranslation } from 'react-i18next';

class CustomButtonIcon extends Component {
    constructor(props) {
        super(props);
    }

    static defaultProps = {
        added_class: "",
        alt: "",
        image: "",
        on_click: null,
        style: {},
    };

    render(){
        return(
            <CustomButtonIconStyle 
                className={`btn ${this.props.added_class || ""}`} type='button' onClick={evt => {
                    if(this.props.on_click){
                        this.props.on_click(evt);
                    }
                }}
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

CustomButtonIcon.propTypes = {
    added_class: PropTypes.string,
    alt: PropTypes.string,
    image: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string,
    ]),
    on_click: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.object,
    ]),
    style: PropTypes.object,
};

export default withTranslation('translations')(CustomButtonIcon);
