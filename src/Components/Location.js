import React from 'react';

const Location = function(props) {

    return (
        <input value={props.value} onChange={props.handleChange} className="search-input"></input>
    )
}

export default Location;