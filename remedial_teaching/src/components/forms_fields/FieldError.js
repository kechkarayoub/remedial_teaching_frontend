import PropTypes from 'prop-types';
import React, { Component } from "react";
import styled from "styled-components";
import { withTranslation } from 'react-i18next';

 class FieldError extends Component {
  constructor(props) {
    super(props);
    this.state = {
      added_class: props.added_class,
      error_message: props.error_message,
    };
  }
  static defaultProps = {
    added_class: "",
    error_message: "",
    test_id: "",
  };

  static getDerivedStateFromProps(props, state) {
    return {
      added_class: props.added_class,
      error_message: props.error_message,
    };
  }

  render() {
    const {added_class, error_message} = this.state;
    var test_id = this.props.test_id || "field_error_test_id";
    return (
      <FieldErrorStyle className={`field_error ${added_class}`} data-testid={test_id}>
        {error_message}
      </FieldErrorStyle>
    );
  }
}

const FieldErrorStyle = styled.div`
  color: red;
`;

FieldError.propTypes = {
  error_message: PropTypes.string,
  test_id: PropTypes.string,
};

export default withTranslation('translations')(FieldError);
