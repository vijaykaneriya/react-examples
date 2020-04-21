import React, { Component, Fragment } from "react";
import { createBrowserHistory } from "history";
import { Router, Switch,  Route, Redirect } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';
import * as Constants from './utils/Constants';
import Layout from "./screen/layout";
import  DefaultScreen  from "./screen/home/home";
import  PostList  from "./screen/post/post-list";
import  postDetail  from "./screen/post/post-detail";
import  postAdd  from "./screen/post/post-add";
import  userList  from "./screen/user/user-list";

import  userDetail  from "./screen/user/user";
import  userwisealbum  from "./screen/user/user-albums";
import  userwisetodos  from "./screen/user/user-todos";
import  Register  from "./screen/register/register";


import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const hist = createBrowserHistory();
//console.log = () => {};

class App extends Component {
  
  render() {
    return (
      <div>
        <Provider store={store} >
          <Router history={hist}>
            <Layout>
                <Switch>
                    <Route path='/' exact component={DefaultScreen} />
                    <Route path={Constants.SCREEN_HOME} component={DefaultScreen} />
                    <Route path={Constants.SCREEN_POSTS} exact component={PostList} />
                    <Route path='/posts/:id'  component={postDetail} />
                    <Route path='/post/add'  component={postAdd} />
                    <Route path='/users' exact component={userList} />
                    <Route path='/users/:id' exact component={userDetail} />
                    <Route path='/users/:id/albums' exact component={userwisealbum} />
                    <Route path='/users/:id/todos' exact component={userwisetodos}  />
                    <Route path='/register' exact component={Register}  />
                </Switch>
              </Layout>
          </Router>
        </Provider>

      </div>
    );
  }

}

export default App;
