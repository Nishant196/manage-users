import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Users() {
    const [users, setUsers] = useState('');
    const [search, setSearch] = useState('');
    const [suggestions, setSuggestions] = useState('');

    const fetchUsers = () => {
        fetch(`https://datapeace-storage.s3-us-west-2.amazonaws.com/dummy_data/users.json`)
        .then((response) => response.json())
        .then((json) => {
            setUsers(json);
        })
    }

    useEffect(() => {
        fetchUsers();
    }, [])

    const onChangeHandler = (text) => {
        let firstNameMatches = [];
        let lastNameMatches = [];
        if (text.length > 0){
            text = text.replace(/\\/g, "");
            firstNameMatches = users.filter(users=>{
                const regex = new RegExp(`${text}`, "gi");
                return users.first_name.match(regex)
            })
            lastNameMatches = users.filter(users=>{
                const regex = new RegExp(`${text}`, "gi");
                return users.last_name.match(regex)
            })
            console.log(firstNameMatches.concat(lastNameMatches));
            setSuggestions(firstNameMatches.concat(lastNameMatches));
        } else {
            fetchUsers();
            setSuggestions('');
        }
        setSearch(text);
    }
    
    return (
        <div className="App">
            <div className="container">
                <div className="table-box">
                    <h1>Users</h1>
                    <input placeholder="Search by first or last name" value={search} onChange={(e) => onChangeHandler(e.target.value)}/>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Age</th>
                                <th>Website</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {suggestions
                            ?<>
                                {suggestions && suggestions.map((suggestion, i) => (
                                    <tr key={i}>
                                        <td><Link to={`../users/${i}`}>{suggestion.first_name}</Link></td>
                                        <td>{suggestion.last_name}</td>
                                        <td>{suggestion.age}</td>
                                        <td>{suggestion.web}</td>
                                        <td>{suggestion.email}</td>
                                    </tr>
                                ))}
                            </>
                            :<>
                                {users && users.map((user, i) => (
                                    <tr key={i}>
                                        <td><Link to={`../users/${i}`}>{user.first_name}</Link></td>
                                        <td>{user.last_name}</td>
                                        <td>{user.age}</td>
                                        <td>{user.web}</td>
                                        <td>{user.email}</td>
                                    </tr>
                                ))}
                            </>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Users;
