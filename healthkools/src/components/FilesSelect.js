import CustomButton from"components/CustomButton"
import PropTypes from 'prop-types';
import React, {Component} from "react";
import styles from "styled-components";
import { withTranslation } from 'react-i18next';

class FilesSelect extends Component {
  constructor(props){
    super(props);
  }

  static defaultProps = {
    accept: "*/*", // It must be one of: - "*/*"(default): All files. - "image/*": Images. - "application/pdf": Pdfs. - ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel": Excels. - ...
    added_className: "",
    containerStyle: null,
    disabled: false,
    multiple: false,
    on_change: null,
    style: null,
    test_id: "files_select_test_id",
    text: "",
    t: val => val,
  };

  render(){
    var style = this.props.style || {};
    style.color = "white";
    style.fontWeight = "bold";
    return (
      <FilesSelectStyle className={"files_select " + this.props.added_className} style={this.props.containerStyle || {}} data-testid={"files_select_container_test_id"}>
        <input type="file" className="hidden" multiple={this.props.multiple} accept={this.props.accept} ref={inp => (this.files_select=inp)} onChange={evt => {
          if(this.props.on_change && !this.props.disabled){
            this.props.on_change(evt);
          }
        }} data-testid={"input_" + this.props.test_id}/>
        <CustomButton added_class={"btn-rounded default-bg-color"} disabled={this.props.disabled} on_click={evt => {
          if(!this.props.disabled && this.files_select){
            this.files_select.click();
          }
        }} style={style} text={this.props.text} test_id={this.props.test_id}/>
      </FilesSelectStyle>
    );
  }
};

const FilesSelectStyle = styles.div`
  margin: auto;
  text-align: center;
  width: 100%;
  
`;

FilesSelect.propTypes = {
  accept: PropTypes.string,
  added_className: PropTypes.string,
  containerStyle: PropTypes.object,
  disabled: PropTypes.bool,
  multiple: PropTypes.bool,
  on_change: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.object,
  ]),
  style: PropTypes.object,
  test_id: PropTypes.string,
  text: PropTypes.string,
  t: PropTypes.func,
};

export default withTranslation('translations')(FilesSelect);
