import defaultRssImg from "assets/img/default_rss_img.png";
import PropTypes from 'prop-types';
import React, { Component } from "react";
import styled from "styled-components";
import { withTranslation } from 'react-i18next';
import { colors } from "assets/variables/colors";

class FeedItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feed: props.feed,
    };
  }

  static defaultProps = {
    feed: {},
    t: val => val,
  };

  static getDerivedStateFromProps(props, state) {
    if(props.feed.title !== state.feed.title){
      var new_state = {feed: props.feed};
      return new_state;
    }
    return null;
  }

  render() {
    const {feed} = this.state;
    return (
      <FeedItemStyle className="bloc-feed">
        <div className="feed-img">
          <img src={feed.thumbnail || feed.enclosure.link || defaultRssImg} className="img-fluid" alt="Rss image" />
        </div>
        <p role="p-title">{feed.title}</p>
        <p className="link">
          <a target="_blank" href={feed.link} rel="noreferrer">
            { this.props.t("Read more...") }
          </a>
        </p>
      </FeedItemStyle>
    );
  }
}

const FeedItemStyle = styled.div`
  background-color: ${colors.white};
  border-radius: 6.3px;
  box-shadow: 1px 1px 18px 1px rgba(0, 0, 0, 0.1);
  margin: 10px 5px;
  margin-bottom: 20px;
  overflow: hidden;
  padding: 13px 15px;
  width: calc(100% - 10px)!important;
  .feed-img{
    float: left;
    height: 100px;
    margin-right: 17px;
    overflow: hidden;
    width: 60%;
    img{
      height: 100%;
      width: 100%;
    }
  }
  a {
    color: ${colors.default_color};
    font-family: Montserrat, sans-serif;
    font-size: 11px;
    font-stretch: normal;
    font-style: normal;
    font-weight: bold;
    letter-spacing: .2px;
    line-height: normal;
    text-align: center;
    text-transform: uppercase;
    img{
      margin-left: 5px;
      width: 15px;
    }
  }
  @media screen and (max-width: 1199px){
    box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.1);
    margin: 10px 5px;
    padding: 13px 15px;
    width: calc(100% - 10px)!important;
    .feed-img{
      margin-right: 15px;
      width: 57%;
    }
  }
  @media screen and (max-width: 767px){
    margin-bottom: 15px;
    .feed-img{
      margin-right: 12px;
      width: 56%;
    }
    p{
      &.link{
        margin-top: 25px;
      }
    }
  }
`;

FeedItem.propTypes = {
  feed: PropTypes.object,
  t: PropTypes.func,
};

export default withTranslation('translations')(FeedItem);
