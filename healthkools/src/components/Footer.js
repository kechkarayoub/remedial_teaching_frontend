import React, {Component} from "react";
import styles from "styled-components";
import LogoImage from "./LogoImage";
import { withTranslation } from 'react-i18next';
import { images } from "./_resources";
import { colors } from "../assets/variables/colors";
import moment from "moment"
// import { Link } from "react-router-dom";
class Footer extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <>
        <FooterStyle>
          <div className="footer-logo">
            <LogoImage style={{
                cursor: "pointer",
                marginBottom: "20px",
                marginLeft: "auto",
                marginRight: "auto",
                maxWidth: "250px",
                minWidth: "200px",
              }}
              on_click={() => {
                this.props.history.push(`/`);
              }} 
            />
          </div>
          <div className="container">
            <div className="bloc-footer new">
              <h3>{ this.props.t("Contact") }{": "}<a href="mailto:hello@healthkools.com">hello@healthkools.com</a></h3>
            </div>
            
          </div>
        </FooterStyle>
        <Copyright className="copyright">
          <p>{moment().format("YYYY") + " © Healthkools. "}{ this.props.t("Carefully crafted by 3 Minds Digital") }</p>
        </Copyright>
      </>
    );
  }
};
const Copyright = styles.div`
width:100%;
  float: left;
  background: #46bfb6;
  text-align: center;
  padding: 10px;
  p{
    font-family: 'Montserrat', sans-serif;
    font-size: 10.5px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 2;
    letter-spacing: normal;
    text-align: center;
    color: $white;
    margin: 0;
  }
`;
const FooterStyle = styles.footer`
      width: 100%;
      float: left;
      background: #f7f7f7;
      border-top: 10px solid ${colors.white};
      box-shadow: 0 -2px 10px 0 rgba(0,0,0,0.15);
      padding-bottom: 30px;
    
      .footer-logo{
        text-align: center;
        margin-bottom: 30px;
        a{
          background: url(${images.bgFooter}) no-repeat scroll;
          width: 294px;
          height: 143px;
          display: block;
          margin: -115px auto 0;
          padding-top: 20px;
          -webkit-filter: drop-shadow(0 -1px 8px rgba(0,0,0,0.15));
          -moz-filter: drop-shadow(0 -1px 8px rgba(0,0,0,0.15));
          -ms-filter: drop-shadow(0 -1px 8px rgba(0,0,0,0.15));
          -o-filter: drop-shadow(0 -1px 8px rgba(0,0,0,0.15));
          filter: drop-shadow(0 -1px 8px rgba(0,0,0,0.15));
          img{
            width: 167px;
          }
        }
      }
      .bloc-footer{
        float: left;
        width: 20%;
        text-align: left;
        h3{
          font-family: 'Montserrat', sans-serif;
          font-size: 14px;
          font-weight: bold;
          font-style: normal;
          font-stretch: normal;
          line-height: normal;
          letter-spacing: 2.4px;
          margin-bottom: 20px;
          color: #292929;
          opacity: 0.63;
        }
        ul{
          margin: 0;
          padding: 0;
          li{
            list-style-type: none;
            a{
              opacity: 0.63;
              font-family: 'Montserrat', sans-serif;
              font-size: 15px;
              font-weight: 400;
              font-style: normal;
              font-stretch: normal;
              line-height: 2.57;
              letter-spacing: normal;
              color: #6c6c6c;
            }
          }
        }
        &.new{
          float: right;
          text-align: center;
          width: 100%;
          margin-top: -15px;
          h3{
            margin-bottom: -20px;
          }
        }
      }
      @media(max-width: 1199px){
        .bloc-footer{
          width: 33.33%;
          ul{
             li{
               a{
                 font-size:13.5px;
               }
             }
          }
        }
      }  

      @media(max-width: 767px){
        overflow-x: inherit;
        .bloc-footer{
          width: 100%;
        }
        .footer-logo{
          margin-bottom: 10px;
          a{
            background-size: 246px auto;
            width: 246px;
            height: 127px;
            margin: -100px auto 0;
            img{
              width: 140px;
            }
          }
        }
      }
`;

export default withTranslation('translations')(Footer);
