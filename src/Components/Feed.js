import React, {useState, useEffect} from 'react';
import Request from './Request';

const Feed = function(props) {
    const [feed, setFeedValue] = useState([]);
    useEffect(() => {
        if (feed.length === 0) {
            getRequests();
        }
    })

    const getRequests = () => {
        var query = `query {
            getRequests {
                id
                subject
                request
                location
                userId
                userName
                createdAt
            }
        }`;
        fetch(`http://localhost:${process.env.PORT || '8080'}/graphql`, {
          method: 'POST',
          headers: {
            'Content-Type':  'application/json',
            'Accept': 'application/json' 
          },
          body: JSON.stringify({
            query
          })
        })
        .then(r => r.json())
        .then(res => setFeedValue(res.data.getRequests))
    }

    return (
        <div>
            <ul>
            {feed.map((request) => <Request key={request.id} request={request} />)}
            </ul>
        </div>
    )
}

export default Feed;