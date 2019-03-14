import React, { useState, useEffect} from 'react';

const Request = function(props) {
    const [userName, setUserNameValue] = useState('');
    const [picture, setPictureValue] = useState('');

    useEffect(() => {
        if (userName === '') {
            getUserName()
        }

    })
    const getUserName = () => {
        var id = props.request.userId;
        var query = `query getUserName($id: String) {
            getUser(id: $id) {
                name
                picture
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
                id
            }
          })
        })
        .then(r => r.json())
        .then(function(res) {
            setUserNameValue(res.data.getUser.name)
            return res
        })
        .then(res => setPictureValue(res.data.getUser.picture))
    }
    return (
        <div>
            {userName || "no user"} <br/>
            <img src={(picture !== '') ? picture : 'http://chittagongit.com//images/default-user-icon/default-user-icon-28.jpg'} alt="" style={{borderRadius: '5px'}} height="50" width="50" /> <br/>
            {props.request.subject || "no subject"} <br/>
            {props.request.request || "no request"} <br/>
            {props.request.location || "no location"} <br/>
            {props.request.createdAt || "no created at"} <br/><br/>
        </div>
    )

}

export default Request;