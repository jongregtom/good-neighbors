import React, { Component } from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import auth0Client from './Auth';
import Callback from './Callback';
import NavBar from './Components/NavBar';
import Home from './Components/Home';
import CreateRequest from './Components/CreateRequest';
import Profile from './Components/Profile';

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

  componentDidUpdate() {
    if (this.state.user === null && auth0Client.isAuthenticated()) {
      this.setState({user: auth0Client.getProfile()}, () => {
        this.addUser(this.state.user);
      })
    }
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
      .catch(err => console.log(err))
  }

  render() {
    //<CreateRequest locationResult={this.state.locationResult} addRequest={this.addRequest} value={this.state.value} handleChange={this.handleChange}  user={this.state.user} />
    return (
      <div>
       
        <NavBar user={this.state.user}/>

        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/callback' component={Callback} />
          <Route 
            path='/CreateRequest'  
            render={props => <CreateRequest {...props} locationResult={this.state.locationResult} addRequest={this.addRequest} value={this.state.value} handleChange={this.handleChange}  user={this.state.user} />} 
          />
          <Route 
            path='/Profile'
            render={props => <Profile {...props} user={this.state.user} />}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
