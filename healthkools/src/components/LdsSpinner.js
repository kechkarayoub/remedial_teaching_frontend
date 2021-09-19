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
    position: absolute;
    top: 0px;
    left: 0px;
    background: #646464;
    opacity: 0.5;
    text-align: left;
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
        position: absolute;
        top: 70%;
        left: 50%;
        transform: translateX(-50%);
    }
    .lds-spinner{
        top:calc(50% - 32px);
        left:calc(50% - 32px);
        color: official;
        display: inline-block;
        position: relative;
        width: 64px;
        height: 64px;
        div{
            transform-origin: 32px 32px;
            animation: lds-spinner 1.2s linear infinite;
            &:after{
                content: " ";
                display: block;
                position: absolute;
                top: 3px;
                left: 29px;
                width: 5px;
                height: 14px;
                border-radius: 20%;
                background: #fff;
            }
            &:nth-child(1){
                transform: rotate(0deg);
                animation-delay: -1.1s;
            }
            &:nth-child(2){
                transform: rotate(30deg);
                animation-delay: -1s;
            }
            &:nth-child(3){
                transform: rotate(60deg);
                animation-delay: -0.9s;
            }
            &:nth-child(4){
                transform: rotate(90deg);
                animation-delay: -0.8s;
            }
            &:nth-child(5){
                transform: rotate(120deg);
                animation-delay: -0.7s;
            }
            &:nth-child(6){
                transform: rotate(150deg);
                animation-delay: -0.6s;
            }
            &:nth-child(7){
                transform: rotate(180deg);
                animation-delay: -0.5s;
            }
            &:nth-child(8){
                transform: rotate(210deg);
                animation-delay: -0.4s;
            }
            &:nth-child(9){
                transform: rotate(240deg);
                animation-delay: -0.3s;
            }
            &:nth-child(10){
                transform: rotate(270deg);
                animation-delay: -0.2s;
            }
            &:nth-child(11){
                transform: rotate(300deg);
                animation-delay: -0.1s;
            }
            &:nth-child(12){
                transform: rotate(330deg);
                animation-delay: -0s;
            }

        }
    }

    &.relative{
        position: relative;
        background: #fff;
        .lds-spinner{
            top:calc(50% - 16px)!important;
            left:calc(50% - 16px)!important;
            width: 32px!important;
            height: 32px!important;
            div{
                transform-origin: 16px 16px!important;
                &:after{
                    top: 2px!important;
                    left: 15px!important;
                    width: 3px!important;
                    height: 7px!important;
                    background: #8f3a3a!important;
                }
            }
        }
    }
`