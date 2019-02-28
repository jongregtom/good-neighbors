import React from 'react';

const Request = function(props) {

    return (
        <div>
            {props.request.userName || ""} <br/>
            {props.request.title || "no title"} <br/>
            {props.request.message || "no message"} <br/>
        </div>
    )

}

export default Request;