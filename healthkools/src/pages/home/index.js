import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import $ from "jquery";


import LoadingAssets from '../../components/LoadingAssets';
import styled from "styled-components";
import BlocFeeds from "./components/Bloc-feeds";
import Footer from "../../components/Footer";
import { get } from "../../services/storage";

window.jQuery = $;
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientWidth: 0,
      clientHeight: 0,
      widthMobile: 0,
      heightMobile: 420,
      openConnexion: false,
      openRegister: false
    };
    this.myRef = React.createRef();
    this.RefMobile = React.createRef();
  }

  updateDimensions = () => {
    this.setState({
      clientWidth: this.myRef.current.clientWidth,
      clientHeight: this.myRef.current.clientHeight,
      widthMobile: this.RefMobile.current.offsetWidth,
      heightMobile: this.RefMobile.current.offsetHeight
    });
  };

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
    window.scrollTo(0, 0);
  }

  componentWillUnmount() {
    this.updateDimensions();
    window.removeEventListener("resize", this.updateDimensions);
  }

  render() {
    return (
      <HomeStyle className="home_container">
        <section className="one" ref={this.myRef}>
          <div className="container">
            <div className="row">
              <div className="col-xl-8 col-lg-12 " ref={this.RefMobile}>
                {/* <Carousel
                  handleOpenModalConnexion={() =>
                    this.setState({ openConnexion: true })
                  }
                  handleOpenModalRegister={()  => this.setState({openRegister:true})}
                /> */}
              </div>
              <div className="col-xl-4 col-lg-12 news-feed">
                <BlocFeeds />
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </HomeStyle>
    );
  }
}
const HomeStyle = styled.div`
  section {
    margin-bottom: 120px;
  }
  @media (max-width: 1199px) {
    section {
      margin-bottom: 150px;
    }
  }
`;
const mapState2Props = state => ({ session: state.session });
export default connect(mapState2Props)(withRouter(Home));
