import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import auth0Client from './Auth';
import Callback from './Callback';
import NavBar from './Components/NavBar';
import Feed from './Components/Feed';
import { requests } from './dummyData';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      feed: [{userName: 'Jon', title: 'title', message: 'messgage', email: 'jon@jon.com'}, {userName: 'Jon', title: 'title2', message: 'messgage2', email: 'jon@jon.com'}]
    }
    this.signIn = this.signIn.bind(this);
  }

  componentDidMount() {
    this.setState({feed: requests})
  }

  componentDidUpdate() {
    if (this.state.userName === '' && auth0Client.isAuthenticated()) {
      this.setState({userName: auth0Client.getProfile().name})
    }
  }
  
  signIn = function() {
    auth0Client.signIn();
  }

  getUserInfo = function() {
    return auth0Client.getProfile().name;
  }

  render() {
    return (
      <div>
        {
            auth0Client.isAuthenticated() &&
            <button onClick={auth0Client.signIn}>Sign In</button>
        }
        {
            !auth0Client.isAuthenticated() &&
            <div>
              <label>{`Welcome, ${this.state.userName}`}</label>
              <NavBar />
              <Feed feed={this.state.feed}/>
            </div>
        }
        <Route exact path='/callback' component={Callback}/>
      </div>
    );
  }
}

export default App;
