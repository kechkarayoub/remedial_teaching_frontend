import FieldError from "components/forms_fields/FieldError";
import FieldValid from "components/forms_fields/FieldValid";
import PropTypes from 'prop-types';
import React, { Component } from "react";
import Select from 'react-select';
import styled from "styled-components";
import { withTranslation } from 'react-i18next';

class CustomSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      added_class: props.added_class,
      countries_options: props.countries_options,
      current_language: props.current_language,
      disabled: props.disabled,
      error_message: props.error_message,
      invalid_message: props.invalid_message,
      label: props.label,
      placeholder: props.placeholder,
      random: props.random,
      test_id: props.test_id || ("custom_select_" + parseInt(Math.random() * 100)),
      valid_message: props.valid_message,
      value: props.value,
    };
    this.searchInput = React.createRef();
  }
  static defaultProps = {
    added_class: "",
    countries_options: [],
    current_language: "en",
    disabled: false,
    error_message: "",
    invalid_message: "",
    label: "",
    on_change: null,
    placeholder: "",
    random: parseInt(Math.random() * 100),
    test_id: "",
    valid_message: "",
    value: "",
  };

  static getDerivedStateFromProps(props, state) {
    return {
        added_class: props.added_class,
        countries_options: props.countries_options,
        current_language: props.current_language,
        disabled: props.disabled,
        error_message: props.error_message,
        invalid_message: props.invalid_message,
        label: props.label,
        placeholder: props.placeholder,
        valid_message: props.valid_message,
        value: props.value,
    };
  }

  componentDidUpdate(prevProps, prevState){
    
  }

  handleChange = (option) => {
    if(this.props.on_change){
        this.props.on_change(option ? option.value : "", option ? option.name : "");
    }
    else{
        this.setState({value: option ? option.value : ""});
    }
  };

  handleFilter = (items) => {
    return (searchValue) => {
      if (searchValue.length === 0) {
        return this.state.countries_options;
      }
      const updatedItems = items.filter((item) => {
        try{
          return item.name.toLowerCase().includes(searchValue.toLowerCase());
        }
        catch{
          debugger
        }
      });
      return updatedItems;
    };
  };

  render() {
    const {added_class, disabled, error_message, invalid_message, label, valid_message, placeholder, countries_options, value, current_language, test_id} = this.state;
    var selected_country_option = value ? countries_options.filter(c_o => c_o.value === value)[0] : null;

    return (
      <CustomSelectStyle className={`field_input input_select ${added_class || ""}`}>
        <div className="field" data-testid={test_id}>
            <label data-testid="label">{label}</label>
            <Select
              key={value || "default"}
              className="basic-single"
              classNamePrefix="select"
              defaultValue={selected_country_option}
              isDisabled={disabled}
              isLoading={false}
              isClearable={true}
              isRtl={current_language === "ar"}
              isSearchable={true}
              name="country"
              placeholder={placeholder}
              options={countries_options}
              onChange={this.handleChange}
            />
        </div>
        {(error_message || invalid_message) &&
            <FieldError error_message={error_message || invalid_message} />
        }
        {valid_message &&
            <FieldValid valid_message={valid_message} />
        }
      </CustomSelectStyle>
    );
  }
}

const CustomSelectStyle = styled.div`
  border: 0;
  border-radius: 6.3px;
  padding: 13px 15px;
  .basic-single >div{
    border: 1px solid #cccccc;
    border-radius: 4px;
    &:focus, &:focus-within, &:active{
      border: 1px solid #1fa1cf;
    }
  }
  .select__control{
    background: #f7f7f7;
    max-height: 38px;
  }
  @media screen and (max-width: 1199px){
  }
  @media screen and (max-width: 767px){
  }
`;

CustomSelect.propTypes = {
  added_class: PropTypes.string,
  countries_options: PropTypes.array,
  current_language: PropTypes.string,
  disabled: PropTypes.bool,
  error_message: PropTypes.string,
  invalid_message: PropTypes.string,
  label: PropTypes.string,
  on_change: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]),
  placeholder: PropTypes.string,
  random: PropTypes.number,
  test_id: PropTypes.string,
  valid_message: PropTypes.string,
  value: PropTypes.string,
};

export default withTranslation('translations')(CustomSelect);
