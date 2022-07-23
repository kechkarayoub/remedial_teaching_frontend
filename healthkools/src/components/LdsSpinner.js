import React from 'react';
import styled from "styled-components";

export default ({type, msg, added_class, revert}) => {
    return(
        <SpinnerStyle className={'loading-spinner ' + (type ? type : "") + (added_class ? added_class : "") + (revert?'revert':'')}>
            <div className="lds-spinner">
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
            {msg &&
                <span className="msg">{msg}</span>
            }
        </SpinnerStyle>
    )
}

const SpinnerStyle = styled.div`
    background: #646464;
    opacity: 0.5;
    left: 0px;
    position: absolute;
    text-align: left;
    top: 0px;
    &.revert{
        background: #fff;
        .lds-spinner div:after{
            background: #000;
        }
    }
    span.msg{
        color: #fff;
        font-size: 20px;
        font-weight: bold;
        left: 50%;
        position: absolute;
        top: 70%;
        transform: translateX(-50%);
    }
    .lds-spinner{
        color: official;
        display: inline-block;
        height: 64px;
        left:calc(50% - 32px);
        position: relative;
        top:calc(50% - 32px);
        width: 64px;
        div{
            animation: lds-spinner 1.2s linear infinite;
            transform-origin: 32px 32px;
            &:after{
                background: #fff;
                border-radius: 20%;
                content: " ";
                display: block;
                height: 14px;
                left: 29px;
                position: absolute;
                top: 3px;
                width: 5px;
            }
            &:nth-child(1){
                animation-delay: -1.1s;
                transform: rotate(0deg);
            }
            &:nth-child(2){
                animation-delay: -1s;
                transform: rotate(30deg);
            }
            &:nth-child(3){
                animation-delay: -0.9s;
                transform: rotate(60deg);
            }
            &:nth-child(4){
                animation-delay: -0.8s;
                transform: rotate(90deg);
            }
            &:nth-child(5){
                animation-delay: -0.7s;
                transform: rotate(120deg);
            }
            &:nth-child(6){
                animation-delay: -0.6s;
                transform: rotate(150deg);
            }
            &:nth-child(7){
                animation-delay: -0.5s;
                transform: rotate(180deg);
            }
            &:nth-child(8){
                animation-delay: -0.4s;
                transform: rotate(210deg);
            }
            &:nth-child(9){
                animation-delay: -0.3s;
                transform: rotate(240deg);
            }
            &:nth-child(10){
                animation-delay: -0.2s;
                transform: rotate(270deg);
            }
            &:nth-child(11){
                animation-delay: -0.1s;
                transform: rotate(300deg);
            }
            &:nth-child(12){
                animation-delay: -0s;
                transform: rotate(330deg);
            }
        }
    }
    &.relative{
        background: #fff;
        position: relative;
        .lds-spinner{
            height: 32px!important;
            left:calc(50% - 16px)!important;
            top:calc(50% - 16px)!important;
            width: 32px!important;
            div{
                transform-origin: 16px 16px!important;
                &:after{
                    background: #8f3a3a !important;
                    height: 7px !important;
                    left: 15px !important;
                    top: 2px !important;
                    width: 3px !important;
                }
            }
        }
    }
`