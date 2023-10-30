import PropTypes from 'prop-types';
import React, { Component } from "react";
import styled from "styled-components";
import { colors } from "assets/variables/colors";
import { withTranslation } from 'react-i18next';

class Loading extends Component {
    constructor(props){
        super(props);
    }

    static defaultProps = {
        added_class: "",
        style: null,
    };

    render(){
        return(
            <LoadingStyle 
                className={` ${this.props.added_class || ""}`} 
                style={this.props.style || {}} data-testid={"loading_css_test_id"}
            >
                <div 
                    className={`lds-default `} 
                >
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </LoadingStyle>
        )
    }
}

const LoadingStyle = styled.div`
    background: #80808099;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 1;
    .lds-default{
        display: inline-block;
        height: 80px;
        left: 50%;
        margin: auto;
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 80px;
        div {
            animation: lds-default 1.2s linear infinite;
            background: #fff;
            border-radius: 50%;
            height: 6px;
            position: absolute;
            width: 6px;
            &:nth-child(1) {
                animation-delay: 0s;
                left: 66px;
                top: 37px;
            }
            &:nth-child(2) {
                animation-delay: -0.1s;
                left: 62px;
                top: 22px;
            }
            &:nth-child(3) {
                animation-delay: -0.2s;
                left: 52px;
                top: 11px;
            }
            &:nth-child(4) {
                animation-delay: -0.3s;
                left: 37px;
                top: 7px;
            }
            &:nth-child(5) {
                animation-delay: -0.4s;
                left: 22px;
                top: 11px;
            }
            &:nth-child(6) {
                animation-delay: -0.5s;
                left: 11px;
                top: 22px;
            }
            &:nth-child(7) {
                animation-delay: -0.6s;
                left: 7px;
                top: 37px;
            }
            &:nth-child(8) {
                animation-delay: -0.7s;
                left: 11px;
                top: 52px;
            }
            &:nth-child(9) {
                animation-delay: -0.8s;
                left: 22px;
                top: 62px;
            }
            &:nth-child(10) {
                animation-delay: -0.9s;
                left: 37px;
                top: 66px;
            }
            &:nth-child(11) {
                animation-delay: -1s;
                left: 52px;
                top: 62px;
            }
            &:nth-child(12) {
                animation-delay: -1.1s;
                left: 62px;
                top: 52px;
            }
        }
    }
    
    @keyframes lds-default {
        0%, 20%, 80%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.5);
        }
    }
`;

Loading.propTypes = {
    added_class: PropTypes.string,
    style: PropTypes.object,
};

export default withTranslation('translations')(Loading);
