import React, { Component } from "react";
import MediaQuery from "react-responsive";
import Slider from "react-slick";
import Feed from "rss-to-json";
import { withTranslation, Trans } from 'react-i18next';
import styled from "styled-components";
import { images } from "../_resources";
import { colors } from "../../../assets/variables/colors";
import axios from "axios";

// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

 class BlocFeeds extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItemIndex: 0,
      data: []
    };
  }

  componentDidMount() {
    var root_url = "https://www.parents.fr/feeds/rss/";
    switch(this.props.pages){
      case "parent":
        root_url+= "enfant";break;
      default:
      root_url+= "enfant";break;
    }
    axios
    .get('https://api.rss2json.com/v1/api.json?rss_url=' + root_url)
    .then(res => {
      this.setState({
        data: res.data.items
      });
    })

  }

  changeActiveItem = activeItemIndex => this.setState({ activeItemIndex });

  render() {
    const settings = {
      dots: false,
      arrows: true,
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1
    };

    let feeds = this.state.data.slice(0, 3).map((rss, idx) => {
      return (
        <div className="bloc-feed" key={idx}>
          <div className="feed-img">
            <img src={rss.enclosure.link} className="img-fluid" />
          </div>
          <p>{rss.title}</p>
          <p className="link link-planete">
            <a target="_blank" href={rss.link}>
            { this.props.t("PLANETE") }
            </a>
          </p>
        </div>
      );
    });

    return (
      <BlocFeedsStyle>
        <h3> { this.props.t("HEALTH INFO") }</h3>
        <div className="bloc-feeds">
          <MediaQuery query="(min-width: 1200px)">{feeds}</MediaQuery>

          <MediaQuery query="(max-width: 1199px) and (min-width: 768px)">
            <Slider {...settings}>{feeds}</Slider>
          </MediaQuery>

          <MediaQuery query="(max-width: 767px)">{feeds}</MediaQuery>
          <p className="feeds">
            <a href="">
            { this.props.t("SEE ALL") } <img src={images.viewAll} />
            </a>
          </p>
        </div>
      </BlocFeedsStyle>
    );
  }
}

const BlocFeedsStyle = styled.div`
   .bloc-feeds{
      margin-top: 10px;
      .feeds {
        margin: 0;
        text-align: center;
      }
      .bloc-feed{
        border-radius: 6.3px;
        box-shadow: 1px 1px 18px 1px rgba(0, 0, 0, 0.1);
        background-color: ${colors.white};
        padding: 13px 15px;
        overflow: hidden;
        margin-bottom: 20px;
      }

        .feed-img{
          float: left;
          width: 60%;
          margin-right: 17px;
          height: 100px;
          overflow: hidden;
        }
        a {
          font-family: Montserrat, sans-serif;
          font-size: 11px;
          font-weight: bold;
          font-style: normal;
          font-stretch: normal;
          line-height: normal;
          letter-spacing: .2px;
          text-transform: uppercase;
          text-align: center;
          color: ${colors.secondary};
          img{
            width: 15px;
            margin-left: 5px;
          }
      }
   }
   
   @media screen and (max-width: 1199px){
        h3{
          color: #46bfb6;
          margin: 50px 0 10px;
          text-align: center;
        }
        .bloc-feeds{
          margin: 10px 7px 0;
          position:relative;
          .feed-img{
            width: 57%;
            margin-right: 15px;
          }
          .bloc-feed{
            box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.1);
            padding: 13px 15px;
            margin: 10px 5px;
            width: calc(100% - 10px)!important;
          }
          .feeds{
            margin-top: 10px;
          }
          .chevronNext,.chevronPrev, .slick-arrow{
            position: absolute;
            top: 50%;
            margin-top: -6px;
            background-color: #46bfb6;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            text-align: center;
            cursor: pointer;
            line-height: 36px;
            font-size: 25px;
            font-family: FontAwesome;
            z-index: 9;
            i{
              color: ${colors.white};
            }
          }
          .slick-next{
            right: -15px;
            &:before{
              line-height: 36px;
              font-size: 25px;
              content: "\f105";
              font-family: FontAwesome;
            }
          }
          .slick-prev{
            left: -15px;
            &:before{
              line-height: 36px;
              font-size: 25px;
              content: "\f104";
              font-family: FontAwesome;
            }
          }
        }
   }
   @media screen and (max-width: 767px){
        h3{
          margin-bottom: 15px;
        }
        .bloc-feeds{
          margin: 10px 0 0;
          .feed-img{
            width: 56%;
            margin-right: 12px;
          }
          .bloc-feed{
            margin-bottom: 15px;
          }
          .feeds{
            margin-top: 25px;
          }
        }
        p{
          &.link{
            margin-top: 25px;
          }
        }
      }
   }
`;
export default withTranslation('translations')(BlocFeeds);


