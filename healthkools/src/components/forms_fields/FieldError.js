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

  static getDerivedStateFromProps(props, state) {
    return {
      error_message: props.error_message,
    };
  }

  render() {
    const {error_message} = this.state;
    var test_id = this.props.test_id || "field_error_test_id";
    return (
      <FieldErrorStyle className={`field_error`} data-testid={test_id}>
        {error_message}
      </FieldErrorStyle>
    );
  }
}

const FieldErrorStyle = styled.div`
  color: red;
`;
export default withTranslation('translations')(FieldError);


