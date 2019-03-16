import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import auth0Client from './Auth';
import Callback from './Callback';
import NavBar from './Components/NavBar';
import Feed from './Components/Feed';
import CreateRequest from './Components/CreateRequest';
//import { requests } from './dummyData';
import places from 'places.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      feed: [],
      locationResult: '',
      value: ''
    }
    //this.signIn = this.signIn.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addUser = this.addUser.bind(this);
  }

  componentWillMount() {
  }

  componentDidMount() {
    //select input tag with className given to utilize places.js, conditional is required as tests won't pass
    if (document.querySelector('.request-location-input') !== null) {
      var placesAutoComplete = (selector) => {
        return places({
          appId: 'plAIVCRMEQI2',
          apiKey: '8c6f78c9fb0d763eb44acdddc3dbbf19',
          container: document.querySelector(selector)
        }).configure({
          type: 'city'
        });
      }
      //provide selector to select element targeted
      placesAutoComplete('.request-location-input').on('change', e => this.setState({locationResult: e.suggestion.value}))
    }
  }

  componentDidUpdate() {
    if (this.state.user === null && auth0Client.isAuthenticated()) {
      this.setState({user: auth0Client.getProfile()}, () => {
        console.log('state', this.state.user)
        this.addUser(this.state.user);
      })
    }
  }
  
  handleChange(e) {
    this.setState({value: e.target.value})
  }

  addUser(user) {
    let id = user.sub, name = user.name || user.nickname, email = user.email, picture = user.picture || null, firstName = user.given_name || user.nickname; 
    var query = `mutation addUser($input: UserInput) {
      addUser(input: $input) {
        id
        name
      }
    }`;
    
    fetch(`http://localhost:${process.env.PORT || '8080'}/graphql`, {
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
      .catch(err => console.log(err))
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

          <CreateRequest locationResult={this.state.locationResult} addRequest={this.addRequest} value={this.state.value} handleChange={this.handleChange}  user={this.state.user} />
          <Feed feed={this.state.feed}/>
        </div>
        <Route exact path='/callback' component={Callback}/>
      </div>
    );
  }
}

export default App;
