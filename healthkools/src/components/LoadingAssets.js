import LdsEllipses from 'components/LdsEllipses';
import React, { Component } from "react";
import styled from "styled-components";
import LogoImage from "components/LogoImage";
import {colors} from "assets/variables/colors";
import { withTranslation } from 'react-i18next';

class LoadingAssets extends Component {
    // constructor(props) {
    //     super(props);
    // }
    render(){
        return(
            <LoadingAssetsStyle className="container-loading-assets">    
                <LogoImage style={{
                    marginBottom: "20px",
                    marginLeft: "auto",
                    marginRight: "auto",
                    maxWidth: "250px",
                    minWidth: "200px",
                    }} 
                />
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