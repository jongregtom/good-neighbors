import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import auth0Client from './Auth';
import Callback from './Callback';
import NavBar from './Components/NavBar';
import Feed from './Components/Feed';
import Location from './Components/Location';
//import LandingPage from './Components/LandingPage';
import { requests } from './dummyData';
import places from 'places.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      feed: [],
      location: '',
      value: ''
    }
    this.signIn = this.signIn.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addUser = this.addUser.bind(this);
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
  }

  componentDidUpdate() {
    //get user info from sign in
    if (this.state.user === null && auth0Client.isAuthenticated()) {
      this.setState({user: auth0Client.getProfile()}, () => {
        this.addUser(this.state.user);
      })

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

  addUser(user) {
    let id = user.aud, name = user.name || user.nickname, email = user.email, picture = user.picture || null, firstName = user.given_name || user.nickname; 
    var query = `mutation addUser($input: UserInput) {
      addUser(input: $input) {
        id
        name
      }
    }`;
    
    fetch('http://localhost:8080/graphql', {
      method: 'POST',
      headers: {
        'Content-Type':  'application/json',
        'Accept': 'application/json' 
      },
      body: JSON.stringify({
        query,
        variables: {
          input: {
            id, 
            name, 
            email, 
            picture, 
            firstName
          }
        }
      })
    })
      .then(r => r.json())
      .then(res => console.log('data returned', res))
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
