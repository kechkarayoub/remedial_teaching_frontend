import PropTypes from 'prop-types';
import React, {Component} from "react";
import styles from "styled-components";
import FilesSelect from "components/FilesSelect";
import InitialsColor from "components/InitialsColor";
import UserImage from "components/UserImage";
import {store_files} from "utils/files_storage";
import { withTranslation } from 'react-i18next';
class CustomEditImage extends Component {
  constructor(props){
    super(props);
    this.state = {
      full_name: props.full_name,
      image_url: props.value,
      initials: props.initials,
      initials_bg_color: props.initials_bg_color,
      uploading: false,
    };
  }
  static defaultProps = {
    containerStyle: null,
    full_name: "",
    initials: "",
    initials_bg_color: "",
    on_change: null,
    style: null,
    label: "",
    test_id: "edit_image_test_id",
    value: "",
    t: val => val,
  };

  static getDerivedStateFromProps(props, state) {
    return {
      full_name: props.full_name,
      image_url: props.value,
      initials: props.initials,
      initials_bg_color: props.initials_bg_color,
    };
  }

  handleImageChange2 = (evt) => {
    let files = evt.target.files;
    let formData = new FormData();
    for(var i=0; i < files.length; i++){
      formData.append("file" + "_" + (i + 1), files[i], files[i].name);
    }
    // this.setState({
    //   uploading: true,
    // });
    store_files(formData).then(res => {
      if(res && res.files){
        let file_res = res.files[0];
        this.props.on_change(file_res.url);
      }
      else{
        console.log("Error...");
      }
    })
    .catch(err => {
      this.setState({
        uploading: false,
      });
      console.log(err);
    });
  }

  handleImageChange = (evt) => {
    let files = evt.target.files;
    let formData = new FormData();
    for(var i=0; i < files.length; i++){
      formData.append("file" + "_" + (i + 1), files[i], files[i].name);
    }
    // this.setState({
    //   uploading: true,
    // });
    store_files(formData).then(res => {
      if(res && res.files){
        let file_res = res.files[0];
        this.props.on_change(file_res.url);
      }
      else{
        console.log("Error...");
      }
    })
    .catch(err => {
      this.setState({
        uploading: false,
      });
      console.log(err);
    });
  }

  render(){
    const {full_name, image_url, initials, initials_bg_color, uploading} = this.state;
    return (
      <CustomEditImageStyle className={this.props.added_class} style={this.props.containerStyle || {}} data-testid={this.props.test_id} >
        {image_url || !initials ?
          <UserImage on_remove={() => this.props.on_change("")} image_url={image_url} title={full_name} />
        :
          <InitialsColor initials={initials} title={full_name} bg_color={initials_bg_color} containerStyle={{}}/>
        }
        <FilesSelect text={this.props.t(image_url ? "Change" : "Select")} accept="image/*" on_change={(evt) => this.handleImageChange(evt)} containerStyle={{width: "100%"}}/>
      </CustomEditImageStyle>
    );
  }
};
const CustomEditImageStyle = styles.div`
  margin: auto;
  padding: 10px;
  position: relative;
`;

CustomEditImage.propTypes = {
  containerStyle: PropTypes.string,
  full_name: PropTypes.string,
  initials: PropTypes.string,
  initials_bg_color: PropTypes.string,
  on_change: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.object,
  ]),
  style: PropTypes.object,
  label: PropTypes.string,
  test_id: PropTypes.string,
  t: PropTypes.func,
  value: PropTypes.string,
};
export default withTranslation('translations')(CustomEditImage);
