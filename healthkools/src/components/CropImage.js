import CustomButton from "components/CustomButton";
import FieldError from "components/forms_fields/FieldError";
import Loading from "components/Loading";
import PropTypes from 'prop-types';
import React, {Component} from "react";
import ReactCrop from 'react-image-crop';
import styles from "styled-components";
import {colors} from "assets/variables/colors";
import {store_files} from "utils/files_storage";
import { withTranslation } from 'react-i18next';
import 'react-image-crop/dist/ReactCrop.css';
class CropImage extends Component {
  constructor(props){
    super(props);
    let image_name_ = props.image_name || ""; 
    if(image_name_){
      // Remove extention from image name
      let image_name_split = image_name_.split(".");
      image_name_split.splice(-1);
      image_name_ = image_name_split.join(".");
    }
    this.state = {
      crop: props.crop,  // Initial position of crop if exists
      do_not_compress_image: props.do_not_compress_image,  // 
      error_message: "",
      image_name: image_name_,  // Name of image to crop
      image_url: props.image_url,  // Url of image to crop
      uploading: false,  // Uploading flag for animation
    };
  }
  static defaultProps = {
    circularCrop: false,
    containerStyle: null,
    crop: {
      height: 50,
      unit: '%',
      width: 50,
      x: 25,
      y: 25
    },
    do_not_compress_image: true,
    image_name: "",
    image_url: "",
    on_crop_completed: null,
    on_remove: null,
    remove_icon_style: null,
    style: null,
    title: "",
    test_id: "crop_image_test_id",
    t: val => val,
  };

  static getDerivedStateFromProps(props, state) {
    return {
      // image_url: props.image_url,
    };
  }

  componentDidMount(){
  }

  onCropChange = (crop, percentCrop) => {
    // The crop coordinate are changed
    this.setState({ crop });
  };
  

  onCropComplete = crop => {
    // We call asynchone makeClientCrop
    this.makeClientCrop(crop);
  };

  async makeClientCrop(crop) {
    let image_doom;
    if(this.crop_container){
      image_doom = this.crop_container.querySelector('.ReactCrop__child-wrapper img');
    }
    if (image_doom && crop.width && crop.height) {
      // Create image url
      const croppedImageUrl = await this.getCroppedImg(
        image_doom,
        crop,
        this.state.image_name ? this.state.image_name + ".jpeg" : 'newFile.jpeg'
      );
      this.setState({ croppedImageUrl: croppedImageUrl });
    }
  }

  getCroppedImg(image, crop, file_name) {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = Math.ceil(crop.width*scaleX);
    canvas.height = Math.ceil(crop.height*scaleY);
    const ctx = canvas.getContext('2d');
    // Draw image
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width*scaleX,
      crop.height*scaleY
    );
    // Create image
    const reader = new FileReader();
    canvas.toBlob(blob => {
      reader.readAsDataURL(blob)
      reader.onloadend = () => {
        this.dataURLtoFile(reader.result, file_name || (this.state.image_name ? this.state.image_name + ".jpeg" : 'newFile.jpeg'));
      }
    }, 'image/jpeg', 1)
  }
  

  dataURLtoFile(dataurl, filename) {
    // Create image object
    let arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    let croppedImage = new File([u8arr], filename, {type:mime});
    this.setState({croppedImage: croppedImage })
  }
  
  handleValidCrop = (evt) => {
    // Validate crop
    this.setState({
      error_message: "",
      uploading: true,
    });
    try{
      let formData = new FormData(),
        file = this.state.croppedImage;
      formData.append("file_1", file, file.name);
      // Upload croped image
      store_files(formData, this.state.do_not_compress_image).then(res => {
        if(res && res.files){
          let file_res = res.files[0];
          this.props.on_change(file_res.url);
        }
        else{
          this.setState({
            error_message: this.props.t("An error has occurred. Please try again or contact the development team."),
            uploading: false,
          });
          console.log("Error...");
          console.log(res);
        }
      })
      .catch(err => {
        this.setState({
          error_message: this.props.t("An error has occurred. Please try again or contact the development team."),
          uploading: false,
        });
        console.log(err);
      });
    }
    catch{
      this.setState({
        error_message: this.props.t("An error has occurred. Please try again or contact the development team."),
        uploading: false,
      });
    }
  }
  render(){
    const {crop, error_message, image_url, uploading} = this.state;
    return (
      <CropImageStyle className="crop_image_container">
        <div className="crop_container" ref={ref => (this.crop_container = ref)} style={this.props.containerStyle || {}} data-testid={this.props.test_id} >
          {this.props.on_remove && image_url &&
            <i className="fa fa-times remove_icon" onClick={evt => {
              evt.stopPropagation();
              this.props.on_remove();
            }} style={this.props.remove_icon_style} data-testid="crop_image_remove_icon_test_id"/>
          }
          {uploading && <Loading style={{height: "calc(100% - 20px)", left: 10, top: 10, width: "calc(100% - 20px)"}}/>}
          <ReactCrop
            circularCrop={this.props.circularCrop}
            crop={crop}
            onChange={this.onCropChange}
            onComplete={this.onCropComplete}
            ruleOfThirds
            src={image_url}
          >
            <img src={image_url} onLoad={evt => {
              this.makeClientCrop(this.state.crop);
            }} alt={this.props.t(this.props.title)} style={this.props.style || {}} data-testid={"image_to_crop_test_id"} id="image_to_crop_test_id" />
          </ReactCrop>
        </div>
        <div className="validate_div">
          <CustomButton
            test_id="confirm_button_test_id"
            added_class="default-bg-color btn-rounded validate" text={uploading ? "Uploading..." : "Confirm"}
            on_click={(evt) => {
              if(uploading) return;
              this.handleValidCrop(evt);
            }}
            style={{color: "white", }}
          />
        </div>
        {error_message &&
            <FieldError error_message={error_message} added_class="ta_c" test_id="field_error_test_id" />
        }
      </CropImageStyle>
    );
  }
};
const CropImageStyle = styles.div`
  .crop_container{
    height: 130px;
    margin: auto;
    padding: 10px;
    position: relative;
    width: 130px;
    img{
      border-radius: 50%;
      height: 110px;
      width: 110px;
    }
    .remove_icon{
      color: red;
      cursor: pointer;
      position: absolute;
      right: 10px;
      top: 10px;
      z-index: 1;
    }
  }
  .validate_div{
    text-align: center;
    .validate{
      background-color: ${colors.default_color};
      border-radius: 20px;
      color: white;
      cursor: pointer;
      font-size: 14px;
      font-weight: bold;
      height: 30px;
      line-height: 30px;
      margin: auto;
      min-width: 100px;
      padding: 0 15px;
      text-align: center;
      width: max-content;
    }
  }
`;

CropImage.propTypes = {
  circularCrop: PropTypes.bool,
  containerStyle: PropTypes.string,
  crop: PropTypes.object,
  do_not_compress_image: PropTypes.bool,
  image_name: PropTypes.string,
  image_url: PropTypes.string,
  on_crop_completed: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.object,
  ]),
  on_remove: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.object,
  ]),
  remove_icon_style: PropTypes.object,
  style: PropTypes.object,
  title: PropTypes.string,
  test_id: PropTypes.string,
  t: PropTypes.func,
};
export default withTranslation('translations')(CropImage);
