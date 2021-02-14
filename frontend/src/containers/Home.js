import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
    <div>
        <div>
            <h1>Welcome to Auth System!</h1>
            <p>This is an incredible authentication system with production level features!</p>
            <hr/>
            <p>Click the Log In button</p>
            <Link to='/login' role='button'>Login</Link>
        </div>
    </div>
);

export default Home;