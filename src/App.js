import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import auth0Client from './Auth';
import Callback from './Callback';
import NavBar from './Components/NavBar';
import Feed from './Components/Feed';
import Location from './Components/Location';
import LandingPage from './Components/LandingPage';
import { requests } from './dummyData';
import places from 'places.js';

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
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
  }

  componentDidMount() {
    //get current request when page loads
    this.setState({feed: requests});
    
    //for Location component, uses places.js to autocomplete cities
    var placesAutoComplete = places({
      appId: 'plAIVCRMEQI2',
      apiKey: '8c6f78c9fb0d763eb44acdddc3dbbf19',
      container: document.querySelector('.search-input')
    }).configure({
      type: 'city'
    });
    //set location state to value selected
    placesAutoComplete.on('change', e => this.setState({location: e.suggestion.value, value: ''}))

    fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type':  'application/json',
        'Accept': 'application/json' 
      },
      body: JSON.stringify({query: "{ hello }"})
    })
      .then(r => r.json())
      .then(res => console.log(res))
  }

  componentDidUpdate() {
    //get user name if not already received
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

  handleChange(e) {
    this.setState({value: e.target.value})
  }

  render() {
    //below commented out for development
    // if (!auth0Client.isAuthenticated()) {
    //   return (
    //     <div>
    //        <LandingPage />
    //     </div>
    //   )
    // }
    return (
      <div>
        <div>
          <label>{`Welcome, ${this.state.userName}`}</label>
          <NavBar />
          <Location location={this.state.location} value={this.state.value} handleChange={this.handleChange} />
          <Feed feed={this.state.feed}/>
        </div>
        <Route exact path='/callback' component={Callback}/>
      </div>
    );
  }
}

export default App;
