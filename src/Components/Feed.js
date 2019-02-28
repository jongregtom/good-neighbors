import React from 'react';
import Request from './Request';

const Feed = function(props) {
    return (
        <div>
            <ul>
            {props.feed.map((request, index) => <Request key={index} request={request} />)}
            </ul>
        </div>
    )
}

export default Feed;