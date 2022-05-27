import React from 'react';
import { Link } from 'react-router-dom';

function Home(){
    return (
        <div style={{height:'100vh',display:'grid',placeItems:'center'}}>
            <Link to="/users" style={{border:'1px solid #DDD',fontSize:'20px',borderRadius:'0.5rem',padding:'10px 30px',textDecoration:'none'}}>Users</Link>
        </div>
    );
}

export default Home;
