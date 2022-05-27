import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function User() {
    const id = useParams().id;
    const [user, setUser] = useState('');

    const fetchUsers = () => {
        fetch(`https://datapeace-storage.s3-us-west-2.amazonaws.com/dummy_data/users.json`)
        .then((response) => response.json())
        .then((json) => {
            setUser(json[id]);
        })
    }

    useEffect(() => {
        fetchUsers();
    }, [])
    
    return (
        <div className="App">
            <div className="container">
                <div className="table-box">
                    <div style={{display:'grid',gridTemplateColumns:'60px auto'}}>
                        <div>
                            <h1><Link to="/users"><i className="fa fa-arrow-left"></i></Link></h1>
                        </div>
                        <div>
                            <h1>Details: {user.first_name} {user.last_name}</h1>
                            <div className="individual-user-details">
                                <p>First Name: <span>{user.first_name}</span></p>
                                <p>Last Name: <span>{user.last_name}</span></p>
                                <p>Age: <span>{user.age}</span></p>
                                <p>Email: <span>{user.email}</span></p>
                                <p>Website: <span>{user.web}</span></p>
                                <p>Company Name: <span>{user.company_name}</span></p>
                                <p>City: <span>{user.city}</span></p>
                                <p>State: <span>{user.state}</span></p>
                                <p>Zip: <span>{user.zip}</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default User;
