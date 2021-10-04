import React, { Component } from "react";
import { withTranslation } from 'react-i18next';
import { get } from "../../services/storage";
import styled from "styled-components";

 class FieldError extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error_message: props.error_message,
    };
  }

  render() {
    const {error_message} = this.state;
    return (
      <FieldErrorStyle className={`field_error`}>
        {error_message}
      </FieldErrorStyle>
    );
  }
}

const FieldErrorStyle = styled.div`
  color: red;
`;
export default withTranslation('translations')(FieldError);


