import React from 'react';
import Feed from './Feed';
import SearchBar from './SearchBar';

const Home = function(props) {
    return (
        <div>
            <SearchBar />
            <Feed />
        </div>
    )
}

export default Home;