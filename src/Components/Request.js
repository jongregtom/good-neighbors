import React, { Component } from 'react';

class Request extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <label>{this.props.userName || "user name"}</label>
    
            </div>
        )
    }
}

export default Request;