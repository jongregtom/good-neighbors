import React, { Component } from 'react';
import './App.css'; 

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {isLoggedIn: true}
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
        hi
      </div>
    );
  }
}

export default App;
