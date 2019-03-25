import React, {useEffect}from 'react';
const places = require('places.js');

const Location = function(props) {

    useEffect(() => {
        let placesAutoComplete = places({
              appId: 'plAIVCRMEQI2',
              apiKey: '8c6f78c9fb0d763eb44acdddc3dbbf19',
              container: document.querySelector('.search-input')
            }).configure({
              type: 'city'
            });
        placesAutoComplete.on('change', (e) => props.handleLocationSet(e.suggestion.value));
    }, [])

    return (
        <input value={props.locationValue} onChange={(e) => props.handleLocationChange(e.target.value)} className="search-input"></input>
    )
}

export default Location;