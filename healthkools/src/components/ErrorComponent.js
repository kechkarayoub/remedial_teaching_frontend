import React, { Component } from "react";
import CustomButton from "components/CustomButton";
import LogoImage from "components/LogoImage";
import styled from "styled-components";
import { withTranslation } from 'react-i18next';

class ErrorComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <ErrorComponentStyle className="container-error-component">
      <LogoImage style={{
          marginBottom: "20px",
          marginLeft: "auto",
          marginRight: "auto",
          maxWidth: "250px",
          minWidth: "200px",
        }} 
      />
      <CustomButton
        added_class="default-bg-color btn-rounded" text={"Try again"}
        on_click={() => {
          // var user = get("user");
          // if(user) {
          // }
          // else
          this.props.history.push(`/`);
        }}
        style={{color: "white", }}
      />
    </ErrorComponentStyle>;
  }
}
const ErrorComponentStyle = styled.div`
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
`;
export default withTranslation('translations')(ErrorComponent);
