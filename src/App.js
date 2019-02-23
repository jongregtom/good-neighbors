import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import Callback from './Callback';
import './App.css'; 
import NavBar from './Components/NavBar';
import Feed from './Components/Feed';
import Request from './Components/Request';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: true,
      userName: 'userName'
    }
  }

  componentDidMount() {
    fetch('/check')
      .then(function(res) {
        console.log(res)
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div>
        <NavBar />
        <Route exact path='/' component={Request}/>
        <Route exact path='/callback' component={Callback}/>
        <Request userName={this.state.userName} request={"REQUEST"}/>
      </div>
    );
  }
}

export default App;
