import React, {Component} from 'react';
import { Link } from "react-router-dom";
import API from '../utils/API';

class NearbyUsers extends Component {
  state = {
    userId: "",
    distanceResponse: []
  }
  usercheck = () => {
    API
      .userCheck()
      .then(res => {
        
        // res is object that can be checked at 3001 api/users/status
        console.log("user check: "+ res.data.id + " " + res.data.username);

        this.setState({
          userId: res.data.id,
          });
      })
    
  }

  nearByUsers = (userId) => {
    API
      .nearbyUsers(userId)
      .then(res => {
        console.log("Res.DAta:    "+res.data);
        this.setState({
          distanceResponse: res.data
        });
      })
  }

  componentDidMount() {
    this.usercheck();
    setTimeout(() => { 
      let uid = this.state.userId;
      this.nearByUsers(uid);
       }, 1000);
  }

  // const nearbyUsers = 
  render () {
    let userId = this.state.userId;
    
    return (
      <div>

        <h1>Nearby Users Filler</h1>

        

        <p>{userId}</p>
        <p>{JSON.stringify(this.state.distanceResponse)}</p>
          
      </div>
    );
  }
}

export default NearbyUsers;