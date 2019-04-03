import React, { Component } from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import auth0Client from './Auth';
import Callback from './Callback';
import NavBar from './Components/NavBar';
import Feed from './Components/Feed';
import CreateRequest from './Components/CreateRequest';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
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

      //placesAutoComplete('.request-location-input').on('change', e => this.setState({locationResult: e.suggestion.value}))
  }

  componentDidUpdate() {
    if (this.state.user === null && auth0Client.isAuthenticated()) {
      this.setState({user: auth0Client.getProfile()}, () => {
        console.log('state', this.state.user)
        this.addUser(this.state.user);
      })
    }
    console.log('isAuth?: ', auth0Client.isAuthenticated())
  }
  
  handleChange(e) {
    this.setState({value: e.target.value})
  }

  addUser(user) {
    let id = user.sub, name = user.nickname || user.name, email = user.email, picture = user.picture || null, firstName = user.given_name || user.nickname; 
    var query = `mutation addUser($input: UserInput) {
      addUser(input: $input) {
        id
        name
      }
    }`;
    
    fetch(`/graphql`, {
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
    //<CreateRequest locationResult={this.state.locationResult} addRequest={this.addRequest} value={this.state.value} handleChange={this.handleChange}  user={this.state.user} />
    return (
      <div>
       
        <NavBar />

        <Switch>
          <Route exact path='/' component={Feed} />
          <Route exact path='/callback' component={Callback} />
          <Route 
            path='/CreateRequest'  
            render={props => <CreateRequest {...props} locationResult={this.state.locationResult} addRequest={this.addRequest} value={this.state.value} handleChange={this.handleChange}  user={this.state.user} />} 
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
