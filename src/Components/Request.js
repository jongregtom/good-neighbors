import React from 'react';

const Request = function(props) {

    return (
        <div>
            {props.request.name || ""} <br/>
            {props.request.subject || "no title"} <br/>
            {props.request.request || "no message"} <br/>
            {props.request.location || "no location"} <br/>
        </div>
    )

}

export default Request;