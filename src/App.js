import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import auth0Client from './Auth';
import Callback from './Callback';
import NavBar from './Components/NavBar';
import Feed from './Components/Feed';
import Request from './Components/Request';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: 'user'
    }
    this.signIn = this.signIn.bind(this);
  }

  componentDidMount() {

  }

  componentDidUpdate(d) {
    if (this.state.userName === 'user') {
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
            !auth0Client.isAuthenticated() &&
            <button className="btn btn-dark" onClick={auth0Client.signIn}>Sign In</button>
        }
        {
            auth0Client.isAuthenticated() &&
            <div>
                <label className="mr-2 text-white">{`Welcome, ${this.state.userName}`}</label>
                <NavBar />
                <Request userName={this.state.userName} request={"REQUEST"}/>
            </div>
        }
        <Route exact path='/' component={Feed}/>
        <Route exact path='/callback' component={Callback}/>
      </div>
    );
  }
}

export default App;
