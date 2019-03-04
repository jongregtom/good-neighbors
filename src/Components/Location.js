import React from 'react';

const Location = function(props) {

    return (
        <form>
            <label>
                <input value={props.value} onChange={props.handleChange} className="search-input"></input>
            </label>
            <input type="submit" value="Submit"></input>
            <p>{props.location}</p>
        </form>
    )
}

export default Location;