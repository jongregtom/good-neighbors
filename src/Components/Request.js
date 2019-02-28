import React, { Component } from 'react';

class Request extends Component {
    render() {
        return (
            <div>
                <label>{this.props.userName || "user name"}</label>
                <label>{this.props.request || "request"}</label>
            </div>
        )
    }
}

export default Request;