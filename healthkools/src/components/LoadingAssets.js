import React, { Component } from "react";
import styled from "styled-components";
import MediaQuery from "react-responsive";
import { withTranslation, Trans } from 'react-i18next';
import LdsEllipses from './LdsEllipses';
import logo from "../assets/img/logo_temp.jpg";
import {colors} from "../assets/variables/colors";

class LoadingAssets extends Component {
    constructor(props) {
        super(props);
    }
    render(){
        return(
            <LoadingAssetsStyle className="container-loading">    
                <img src={logo} alt="Logo"/>
                <strong>{this.props.t("Loading")}</strong>
                <LdsEllipses/>
            </LoadingAssetsStyle>
        )
    }
}
const LoadingAssetsStyle = styled.div`
    display: flex;
    flex-direction: column;
    height: max-content;
    left: 50%;
    position: absolute;
    text-align: center;
    top: 50%;
    transform: translate(-50%, -50%);
    img{
        margin-bottom: 20px;
        margin-left: auto;
        margin-right: auto;
        max-width: 250px;
        min-width: 200px;
    }
    strong{
        color: ${colors.default_color};
        margin-bottom: 20px;
    }
`;
export default withTranslation('translations')(LoadingAssets);