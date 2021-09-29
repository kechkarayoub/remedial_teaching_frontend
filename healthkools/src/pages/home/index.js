import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import $ from "jquery";
import styled from "styled-components";
import BlocFeeds from "./components/BlocFeeds";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

window.jQuery = $;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <HomeStyle className="home-container">
        <Header {...this.props}/>
        <section className="one">
          <div className="container">
            <div className="row">
              <div className="col-xl-8 col-lg-12 ">
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
        <Footer {...this.props}/>
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
