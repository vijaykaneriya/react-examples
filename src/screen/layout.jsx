import React from 'react';
import { connect } from 'react-redux';

import * as ApiUrls from '../actions/ApiUrls';

import BaseComponent from '../common/BaseComponent';
import { Route, Redirect } from "react-router-dom";
import * as  CustomStorage from '../utils/CustomStorage';
import * as  Constants from '../utils/Constants';
import { Header } from '../common/Header';
import { Footer } from '../common/Footer';

import { MainNav } from '../common/NavigationItem';

import { Container } from 'react-bootstrap';
import { Navigation } from './../assets/styled-components/styled';





class Layout extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      Navigation : [
        {
            "menu_title" : "Home",
            "menu_link" : "home",
            "menu_slug" : "home"
        },
        {
            "menu_title" : "Posts",
            "menu_link" : "posts",
            "menu_slug" : "post"
        },
        {
          "menu_title" : "Users",
          "menu_link" : "users",
          "menu_slug" : "users"
      },
      {
        "menu_title" : "Register",
        "menu_link" : "register",
        "menu_slug" : "register"
    }
        
    ],
    };
  }

  componentDidMount() {

  }




  render() {



    



    return (
      <div className="page">
        <Container-fluid>
          <Header />
          <Navigation className="navbar-expand-lg navbar navbar-dark bg-dark">
            <Container>
              <ul className="nav navbar-nav">
                {this.state.Navigation.map((item, index) =>
                  <MainNav
                    key={index}
                    MenuName={item[Constants.KEY_MENU_TITLE]}
                    linkItem={item[Constants.KEY_MENU_LINK]}
                  />
                )}
              </ul>
            </Container>
          </Navigation>
          <Container>
            {this.props.children}
          </Container>
        </Container-fluid>
      </div>
    );

  }



}



function mapStateToProps({ response }) {
  return response;
}


export default connect(mapStateToProps)(Layout);