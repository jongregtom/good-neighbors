import React, {useState} from 'react';

const CreateRequest = function(props) {
    const [subjectValue, setSubjectValue] = useState('');
    const [requestValue, setRequestValue] = useState('');
    const [locationValue, setLocationValue] = useState('');
    //let location = props.location, userId = props.user.id || null;

    const handleSubmit = (e) => {
        e.preventDefault();
        addRequest();
    }

    const addRequest = () => {
        let subject = subjectValue, request = requestValue, location = props.locationResult, userId = props.user.aud;
        var query = `mutation addRequest($input: RequestInput) {
          addRequest(input: $input) {
            id
            subject
            request
            location
            userId
          }
        }`;
        
        fetch(`http://localhost:${process.env.PORT || '8080'}/graphql`, {
          method: 'POST',
          headers: {
            'Content-Type':  'application/json',
            'Accept': 'application/json' 
          },
          body: JSON.stringify({
            query,
            variables: {
              input: {
                subject,
                request,
                location,
                userId
              }
            }
          })
        })
          .then(r => r.json())
          .then(res => console.log('data returned', res))
    }

    return (  
        <form onSubmit={handleSubmit}>
            <label>
                Create New Request:
                <input type="text" placeholder="Subject" value={subjectValue} onChange={e => setSubjectValue(e.target.value)} />
                <input type="text" placeholder="Enter Request Here" value={requestValue} onChange={e => setRequestValue(e.target.value)} />
                <input type="text" value={locationValue} onChange={e => setLocationValue(e.target.value)} className="request-location-input"></input>
                <input type="submit" value="Submit" />
            </label>
        </form>
    )
}

export default CreateRequest;