import React, { Component } from "react";
import { withTranslation, Trans } from 'react-i18next';
import styled from "styled-components";
import { colors } from "../../../assets/variables/colors";
import defaultRssImg from "../../../assets/img/default_rss_img.png";

 class FeedItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feed: props.feed,
    };
  }

  render() {
    const {feed} = this.state;
    return (
      <FeedItemStyle className="bloc-feed">
        <div className="feed-img">
          <img src={feed.thumbnail || feed.enclosure.link || defaultRssImg} className="img-fluid" />
        </div>
        <p role="p-title">{feed.title}</p>
        <p className="link link-planete">
          <a target="_blank" href={feed.link}>
            { this.props.t("Read more...") }
          </a>
        </p>
      </FeedItemStyle>
    );
  }
}

const FeedItemStyle = styled.div`
  border-radius: 6.3px;
  box-shadow: 1px 1px 18px 1px rgba(0, 0, 0, 0.1);
  background-color: ${colors.white};
  padding: 13px 15px;
  overflow: hidden;
  margin-bottom: 20px;
  margin: 10px 5px;
  width: calc(100% - 10px)!important;
  .feed-img{
    float: left;
    width: 60%;
    margin-right: 17px;
    height: 100px;
    overflow: hidden;
    img{
      width: 100%;
      height: 100%;
    }
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
    color: ${colors.default_color};
    img{
      width: 15px;
      margin-left: 5px;
    }
  }
  @media screen and (max-width: 1199px){
    box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.1);
    padding: 13px 15px;
    margin: 10px 5px;
    width: calc(100% - 10px)!important;
    .feed-img{
      width: 57%;
      margin-right: 15px;
    }
  }
  @media screen and (max-width: 767px){
    margin-bottom: 15px;
    .feed-img{
      width: 56%;
      margin-right: 12px;
    }
    p{
      &.link{
        margin-top: 25px;
      }
    }
  }
`;
export default withTranslation('translations')(FeedItem);


