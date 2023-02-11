import React, { Component } from "react";
import { withTranslation } from 'react-i18next';
import { get } from "services/storage";
import styled from "styled-components";
import PropTypes from 'prop-types';

 class FieldValid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valid_message: props.valid_message,
    };
  }
  static defaultProps = {
    valid_message: "",
    // test_id: "",
  };
  static getDerivedStateFromProps(props, state) {
    return {
      valid_message: props.valid_message,
    };
  }

  render() {
    const {valid_message} = this.state;
    return (
      <FieldValidStyle className={`field_valid`}>
        {valid_message}
      </FieldValidStyle>
    );
  }
}

const FieldValidStyle = styled.div`
  color: green;
`;
FieldValid.propTypes = {
  valid_message: PropTypes.string,
  // test_id: PropTypes.string,
};
export default withTranslation('translations')(FieldValid);


