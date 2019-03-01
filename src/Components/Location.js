import React from 'react';

const Location = function(props) {
    return (
        <form onSubmit={props.handleSubmit}>
            <label>
                Enter Location:
                <textarea value={props.value} onChange={props.handleChange}></textarea>
            </label>
            <input type="submit" value="Submit"></input>
            <p>{props.location}</p>
        </form>
    )
}

export default Location;