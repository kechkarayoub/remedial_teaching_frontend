import CropImage from "components/CropImage";
import FieldError from "components/forms_fields/FieldError";
import FilesSelect from "components/FilesSelect";
import InitialsColor from "components/InitialsColor";
import Loading from "components/Loading"
import PropTypes from 'prop-types';
import React, {Component} from "react";
import styles from "styled-components";
import UserImage from "components/UserImage";
import {store_files} from "utils/files_storage";
import { withTranslation } from 'react-i18next';
import 'react-image-crop/dist/ReactCrop.css';
class CustomEditImage extends Component {
  constructor(props){
    super(props);
    this.state = {
      crop_image: props.crop_image,  // Flag to check if the image will be cropped or not
      crop_start: false,  // Flag indicating if the crop is started or not
      current_image_url: props.value, // Contains the current image url 
      error_message: props.error_message,
      image_url: props.value, // The original image url
      initials: props.initials,
      initials_bg_color: props.initials_bg_color, 
      is_test: props.is_test,
      local_error_message: "",
      raise_error: props.raise_error,
      title: props.title,  // The title
      uploading: false,  // Flag indicating if the upload is started or not
    };
  }
  static defaultProps = {
    containerStyle: null,
    crop_image: true,
    error_message: "",
    handleCropping: null,
    initials: "",
    initials_bg_color: "",
    is_test: false,
    on_change: null,
    raise_error: false,
    style: null,
    label: "",
    test_id: "edit_image_test_id",
    title: "",
    value: "",
    t: val => val,
  };

  static getDerivedStateFromProps(props, state) {
    let new_state = {
      error_message: props.error_message,
      initials: props.initials,
      initials_bg_color: props.initials_bg_color,
      title: props.title,
    };
    if(state.image_url != props.value){
      new_state.image_url = props.value;
      new_state.current_image_url = props.value;
      new_state.crop_start = false;
    }
    return new_state;
  }
  

  handleImageChange = (evt) => {
    let files = evt.target.files;
    if(this.props.is_test){
      // Handle cropping state to prevent validation if cropping not ended
      if(this.state.crop_image && this.props.handleCropping){
        this.props.handleCropping(true);
      }
      // Save file information
      this.setState({
        crop_start: this.state.crop_image,
        current_image_url: "image_url",
        image_name: "image_name",
        local_error_message: "",
        uploading: !this.state.crop_image,
      });
    }
    else if (files && files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        // Handle cropping state to prevent validation if cropping not ended
        if(this.state.crop_image && this.props.handleCropping){
          this.props.handleCropping(true);
        }
        // Save file information
        this.setState({
          crop_start: this.state.crop_image,
          current_image_url: reader.result,
          image_name: files[0].name,
          local_error_message: "",
          uploading: !this.state.crop_image,
        });
      });
      reader.readAsDataURL(files[0]);
    }
    if(this.state.crop_image){
      // If the crop_image flag is true, we don't upload image yet.
      return;
    }
    // If the crop_image flag is false, we upload files.
    let formData = new FormData();
    if(this.props.is_test){
      formData = {"file_1": {}};
      if(this.props.raise_error){
        formData.raise_error = true;
      }
    }
    else{
      for(var i=0; i < files.length; i++){
        formData.append("file" + "_" + (i + 1), files[i], files[i].name);
      }
    }
    store_files(formData).then(res => {
      if(res && res.files){
        let file_res = res.files[0];
        if(this.state.crop_image && this.props.handleCropping){
          this.props.handleCropping(false);
        }
        this.setState({
          local_error_message: "",
          crop_start: false, uploading: false,
        }, () => {
          this.props.on_change(file_res.url);
        });
      }
      else{
        this.setState({
          local_error_message: this.props.t("An error has occurred. Please try again or contact the development team."),
          uploading: false,
        });
        console.log("Error...");
        console.log(res);
      }
    })
    .catch(err => {
      this.setState({
        local_error_message: this.props.t("An error has occurred. Please try again or contact the development team."),
        uploading: false,
      });
      console.log(err);
    });
  }

  on_remove = () => {
    this.setState({
      local_error_message: "",
      crop_start: false, 
      current_image_url: "",
    }, () => {
      this.props.on_change("");
    });    
  }

  render(){
    const {crop_start, current_image_url, error_message, initials, initials_bg_color, local_error_message, title, uploading} = this.state;
    return (
      <CustomEditImageStyle className={this.props.added_class} style={this.props.containerStyle || {}} data-testid={this.props.test_id} >
        {current_image_url && crop_start ?
        <>
          <CropImage is_test={this.props.is_test} image_name={this.state.image_name} on_remove={() => this.on_remove()} image_url={(current_image_url)} title={title} on_change={this.props.on_change} />
        </>
        :
        <>
          {(current_image_url) || !initials ?
            <>
             {uploading && <Loading style={{height: 110, left: "50%", padding: 10, top: 20, transform: "translateX(-50%)", width: 110}}/>}
              <UserImage on_remove={() => this.on_remove()} image_url={(current_image_url)} title={title} />
            </>
          :
            <InitialsColor initials={initials} title={title} bg_color={initials_bg_color} containerStyle={{}}/>
          }
        </>
        }
        {!crop_start &&
          <FilesSelect text={this.props.t(uploading ? "Uploading..." : current_image_url ? "Change" : "Select")} accept="image/*" on_change={(evt) => this.handleImageChange(evt)} containerStyle={{width: "100%"}} disabled={uploading}/>
        }
        {(error_message || local_error_message) &&
            <FieldError error_message={error_message || local_error_message} added_class="ta_c" />
        }
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
  crop_image: PropTypes.bool,
  error_message: PropTypes.string,
  handleCropping: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.object,
  ]),
  initials: PropTypes.string,
  initials_bg_color: PropTypes.string,
  is_test: PropTypes.bool,
  on_change: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.object,
  ]),
  raise_error: PropTypes.bool,
  style: PropTypes.object,
  label: PropTypes.string,
  test_id: PropTypes.string,
  title: PropTypes.string,
  t: PropTypes.func,
  value: PropTypes.string,
};
export default withTranslation('translations')(CustomEditImage);
