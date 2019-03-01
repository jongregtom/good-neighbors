import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import auth0Client from './Auth';
import Callback from './Callback';
import NavBar from './Components/NavBar';
import Feed from './Components/Feed';
import Location from './Components/Location';
import { requests } from './dummyData';
const API_KEY = 'AIzaSyBrvCMnxwpFRqVhsUGyYA_YSyuZProgabU';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      feed: [],
      location: '',
      value: ''
    }
    this.signIn = this.signIn.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleLocationSubmit = this.handleLocationSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({feed: requests});
    
    fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=paris&key=${API_KEY}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'no-cors'
    })//.then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.log('error:', err));
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

  handleLocationChange(e) {
    this.setState({value: e.target.value})
  }

  handleLocationSubmit(e) {
    e.preventDefault();
    this.setState({location: this.state.value});
    console.log(this.state.location)
  
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
              <Location location={this.state.location} handleSubmit={this.handleLocationSubmit} handleChange={this.handleLocationChange}/>
              <Feed feed={this.state.feed}/>
            </div>
        }
        <Route exact path='/callback' component={Callback}/>
      </div>
    );
  }
}

export default App;
