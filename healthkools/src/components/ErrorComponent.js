import React, { Component } from "react";

import MediaQuery from "react-responsive";
import logo from "../assets/img/logo_temp.jpg";
import { get } from "../services/storage";
export default class ErrorComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div className="d-flex flex-column justify-content-center align-items-center" style={{height:'100vh'}}>
        <MediaQuery query="(min-width: 500px)">
            <img src={logo} alt="Logo" style={{width:'500px'}}/>
        </MediaQuery>
        <MediaQuery query="(max-width: 500px)">
            <img src={logo} alt="Logo" style={{width:'300px'}}/>
        </MediaQuery>
        <button type='button' className='btn btn-rounded btn-green mt-3' 
            onClick={() => {
                var user = get("session_user");
                if(user) {
                }
                else
                    this.props.history.push(`/`);
            }}>
            Réessayer
        </button>
      </div>;
  }
}
