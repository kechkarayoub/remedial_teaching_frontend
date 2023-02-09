import React from 'react';
import styled from "styled-components";
import {colors} from "assets/variables/colors";

export default ({type, msg}) => {
  return(
    <SpinnerStyle className='loading-spinner'>
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </SpinnerStyle>
  )
}

const SpinnerStyle = styled.div`
  text-align:center;
 .lds-ellipsis {
    display: inline-block;
    height: 17px;
    position: relative;
    width: 64px;
  }
  .lds-ellipsis div {
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
    background: ${colors.default_color};
    border-radius: 50%;
    height: 11px;
    position: absolute;
    width: 11px;
  }
  .lds-ellipsis div:nth-child(1) {
    animation: lds-ellipsis1 0.6s infinite;
    left: 6px;
  }
  .lds-ellipsis div:nth-child(2) {
    animation: lds-ellipsis2 0.6s infinite;
    left: 6px;
  }
  .lds-ellipsis div:nth-child(3) {
    animation: lds-ellipsis2 0.6s infinite;
    left: 26px;
  }
  .lds-ellipsis div:nth-child(4) {
    animation: lds-ellipsis3 0.6s infinite;
    left: 45px;
  }
  @keyframes lds-ellipsis1 {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes lds-ellipsis3 {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
  @keyframes lds-ellipsis2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(19px, 0);
    }
  }
`