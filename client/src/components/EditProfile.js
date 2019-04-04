import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import API from '../utils/API';
import Modal from './Modal';

class EditProfile extends Component {
  state = {
    userId: "",
    active: "modal",
    allGames: []
  }

  usercheck = () => {
    API
      .userCheck()
      .then(res => {
        
        // res is object that can be checked at 3001 api/users/status
        console.log("user check: "+ res.data.id + " " + res.data.username);

        this.setState({
          userId: res.data.id,
          active: "modal"
          });
      })
    
  }

  getAllGames = () => {
    API
      .allGames()
      .then(res => {
        this.setState({
          allGames: res.data
        });
    })
  }

  handleInputChange = e => {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    })
  }

  close = () => {
    this.setState({active: "modal"});
  }

  componentDidMount() {
    this.usercheck();
    this.getAllGames();
    // setTimeout(() => { 
    //   let uid = this.state.userId;
    //   this.nearByUsers(uid);
    //    }, 1000);
  }

  // const nearbyUsers = 
  render () {
    let userId = this.state.userId;
    let allGames = this.state.allGames;
    return (
      <div>

        <h1>Edit Profile Filler</h1>

        

        <p>{userId}</p>
        <p>{JSON.stringify(allGames)}</p>
        
          
      </div>
    );
  }
}

export default EditProfile;