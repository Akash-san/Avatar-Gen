import './App.css';
import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  state = {
    users: [],
    searchText: "",
  };

  componentDidMount() {
    axios
      .get("https://reqres.in/api/users?page=2")
      .then((response) => {
        const usersArray = Array.from(response.data.data);
        this.setState({
          users: usersArray,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleChange = (event) => {
    this.setState({
      searchText: event.target.value,
    });
  };

  render() {
    const { users, searchText } = this.state;

    return (
      <div className='centered-div' >
        <h2>
          Search For Avatar
        </h2>
      
        <input className='input'
          type="text"
          placeholder="Search by first name"
          value={searchText}
          onChange={this.handleChange}
        />
        <ul className="user-list">
          {users.filter((user) => {
            return user.first_name.toLowerCase().includes(searchText.toLowerCase());
          })
            .map((user) => (
              <li key={user.id} className="user-item">
                <span className="user-id">{user.id}</span>
               <div className="user-image-container">
                 <img src={user.avatar} alt="" className="user-image" />
               </div>
              <span className="user-name">{user.first_name}</span>
              </li>
            ))}
        </ul>
      </div>
    );
  }
}


export default App;





