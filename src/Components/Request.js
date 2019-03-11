import React from 'react';

const Request = function(props) {

    return (
        <div>
            {props.request.userId || "no user"} <br/>
            {props.request.subject || "no subject"} <br/>
            {props.request.request || "no request"} <br/>
            {props.request.location || "no location"} <br/>
            {props.request.createdAt || "no created at"} <br/>
        </div>
    )

}

export default Request;